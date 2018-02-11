/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.everydots.kafka.streams;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import eu.bitwalker.useragentutils.UserAgent;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.connect.json.JsonDeserializer;
import org.apache.kafka.connect.json.JsonSerializer;
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Produced;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Properties;
import java.util.concurrent.CountDownLatch;

/**
 * In this example, we implement a simple LineSplit program using the high-level Streams DSL
 * that reads from a source topic "streams-plaintext-input", where the values of messages represent lines of text,
 * and writes the messages as-is into a sink topic "streams-pipe-output".
 */
public class Transformer {

    private static final String CONFIG_MANAGEMENT_URL = "http://35.187.244.144:9000/config/customer5";

    final static Logger logger = LoggerFactory.getLogger(Transformer.class);

    public static void main(String[] args) throws Exception {

        HashMap hashMap = getConfig();
        String kafkaBrokerUrl = hashMap.get("kafka_broker_url").toString();
        String kafkaSourceTopic = hashMap.get("kafka_source_topic").toString();
        String kafkaSinkTopic = hashMap.get("kafka_sink_topic").toString();

        System.out.println(kafkaBrokerUrl + kafkaSinkTopic + kafkaSourceTopic);
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "streams-pipe");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBrokerUrl);


        final Serializer<JsonNode> jsonSerializer = new JsonSerializer();
        final Deserializer<JsonNode> jsonDeserializer = new JsonDeserializer();
        final Serde<JsonNode> jsonSerde = Serdes.serdeFrom(jsonSerializer, jsonDeserializer);

        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(StreamsConfig.COMMIT_INTERVAL_MS_CONFIG, 2 * 1000);

        final StreamsBuilder builder = new StreamsBuilder();

        final Consumed<String, JsonNode> consumed = Consumed.with(Serdes.String(), jsonSerde);
        KStream<String, JsonNode> records = builder.stream(kafkaSourceTopic, consumed)
                .filterNot((key, value) -> value.get("agent") == null || value.get("user") == null)
                .mapValues(value -> {
                    LocalDateTime now = LocalDateTime.now();
                    ObjectNode jsonNode = JsonNodeFactory.instance.objectNode();
                    UserAgent userAgent = UserAgent.parseUserAgentString(value.get("agent").asText());
                    jsonNode
                            .put("userId", value.get("user").asText())
                            .put("year", now.getYear())
                            .put("month", now.getMonth().getValue())
                            .put("day", now.getDayOfMonth())
                            .put("browser", userAgent.getBrowser().getName())
                            .put("device", userAgent.getOperatingSystem().getDeviceType().getName())
                            .put("action", value.get("action"));
                    logger.debug(String.format("Transform message: %s", jsonNode.toString()));
                    return jsonNode;
                });
        records.to(kafkaSinkTopic, Produced.with(Serdes.String(), jsonSerde));


        final Topology topology = builder.build();
        final KafkaStreams streams = new KafkaStreams(topology, props);
        final CountDownLatch latch = new CountDownLatch(1);

        // attach shutdown handler to catch control-c
        Runtime.getRuntime().addShutdownHook(new Thread("streams-shutdown-hook") {
            @Override
            public void run() {
                streams.close();
                latch.countDown();
            }
        });

        try {
            streams.start();
            latch.await();
        } catch (Throwable e) {
            System.exit(1);
        }
        System.exit(0);
    }

    private static HashMap getConfig() throws IOException {
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet request = new HttpGet(CONFIG_MANAGEMENT_URL);

        HttpResponse response = client.execute(request);
        BufferedReader rd = new BufferedReader(
                new InputStreamReader(response.getEntity().getContent()));

        StringBuffer result = new StringBuffer();
        String line = "";
        while ((line = rd.readLine()) != null) {
            result.append(line);
        }
        System.out.println(result);

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(result.toString(), HashMap.class);
    }
}

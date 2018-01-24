/*
 * Copyright (c) 2017. Hans-Peter Grahsl (grahslhp@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.everydots.kafka.connect.mongodb.processor.id.strategy;

import com.everydots.kafka.connect.mongodb.converter.SinkDocument;
import org.apache.kafka.connect.sink.SinkRecord;
import org.bson.BsonString;
import org.bson.BsonValue;

public class KafkaMetaDataStrategy implements IdStrategy {

    public static final String DELIMITER = "#";

    @Override
    public BsonValue generateId(SinkDocument doc, SinkRecord orig) {

       return new BsonString(orig.topic()
                        + DELIMITER + orig.kafkaPartition()
                        + DELIMITER + orig.kafkaOffset());

    }

}

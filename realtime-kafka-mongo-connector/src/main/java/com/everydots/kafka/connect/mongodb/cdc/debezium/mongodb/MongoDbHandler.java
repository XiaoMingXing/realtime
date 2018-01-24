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

package com.everydots.kafka.connect.mongodb.cdc.debezium.mongodb;

import com.everydots.kafka.connect.mongodb.MongoDbSinkConnectorConfig;
import com.everydots.kafka.connect.mongodb.cdc.CdcOperation;
import com.everydots.kafka.connect.mongodb.cdc.debezium.DebeziumCdcHandler;
import com.everydots.kafka.connect.mongodb.cdc.debezium.OperationType;
import com.everydots.kafka.connect.mongodb.converter.SinkDocument;
import com.mongodb.client.model.WriteModel;
import org.apache.kafka.connect.errors.DataException;
import org.bson.BsonDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class MongoDbHandler extends DebeziumCdcHandler {

    public static final String JSON_ID_FIELD_PATH = "id";

    private final Map<OperationType,CdcOperation> operations = new HashMap<>();
    private static Logger logger = LoggerFactory.getLogger(MongoDbHandler.class);

    public MongoDbHandler(MongoDbSinkConnectorConfig config) {
        super(config);
        operations.put(OperationType.CREATE,new MongoDbInsert());
        operations.put(OperationType.READ,new MongoDbInsert());
        operations.put(OperationType.UPDATE,new MongoDbUpdate());
        operations.put(OperationType.DELETE,new MongoDbDelete());
        registerOperations(operations);
    }

    @Override
    public Optional<WriteModel<BsonDocument>> handle(SinkDocument doc) {

        BsonDocument keyDoc = doc.getKeyDoc().orElseThrow(
                () -> new DataException("error: key document must not be missing for CDC mode")
        );

        BsonDocument valueDoc = doc.getValueDoc()
                                    .orElseGet(BsonDocument::new);

        if(keyDoc.containsKey(JSON_ID_FIELD_PATH)
                && valueDoc.isEmpty()) {
            logger.debug("skipping debezium tombstone event for kafka topic compaction");
            return Optional.empty();
        }

        logger.debug("key: "+keyDoc.toString());
        logger.debug("value: "+valueDoc.toString());

        return Optional.of(getCdcOperation(valueDoc).perform(doc));
    }

}

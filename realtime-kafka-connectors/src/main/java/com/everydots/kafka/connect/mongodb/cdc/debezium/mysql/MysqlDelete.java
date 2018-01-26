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

package com.everydots.kafka.connect.mongodb.cdc.debezium.mysql;

import com.everydots.kafka.connect.mongodb.cdc.CdcOperation;
import com.everydots.kafka.connect.mongodb.cdc.debezium.OperationType;
import com.everydots.kafka.connect.mongodb.converter.SinkDocument;
import com.mongodb.client.model.DeleteOneModel;
import com.mongodb.client.model.WriteModel;
import org.apache.kafka.connect.errors.DataException;
import org.bson.BsonDocument;

public class MysqlDelete implements CdcOperation {

    @Override
    public WriteModel<BsonDocument> perform(SinkDocument doc) {

        BsonDocument keyDoc = doc.getKeyDoc().orElseThrow(
                () -> new DataException("error: key doc must not be missing for delete operation")
        );

        BsonDocument valueDoc = doc.getValueDoc().orElseThrow(
                () -> new DataException("error: value doc must not be missing for delete operation")
        );

        try {
            BsonDocument filterDoc = MysqlHandler.generateFilterDoc(keyDoc, valueDoc, OperationType.DELETE);
            return new DeleteOneModel<>(filterDoc);
        } catch(Exception exc) {
            throw new DataException(exc);
        }

    }

}

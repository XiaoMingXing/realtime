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

package com.everydots.kafka.connect.mongodb.processor;

import com.everydots.kafka.connect.mongodb.MongoDbSinkConnectorConfig;
import com.everydots.kafka.connect.mongodb.converter.SinkDocument;
import com.everydots.kafka.connect.mongodb.processor.field.projection.BlacklistProjector;
import org.apache.kafka.connect.sink.SinkRecord;

import java.util.Set;
import java.util.function.Predicate;

public class BlacklistKeyProjector extends BlacklistProjector {

    private Predicate<MongoDbSinkConnectorConfig> predicate;

    public BlacklistKeyProjector(MongoDbSinkConnectorConfig config) {
        this(config,config.getKeyProjectionList(),
                cfg -> cfg.isUsingBlacklistKeyProjection());
    }

    public BlacklistKeyProjector(MongoDbSinkConnectorConfig config, Set<String> fields,
                                 Predicate<MongoDbSinkConnectorConfig> predicate) {
        super(config);
        this.fields = fields;
        this.predicate = predicate;
    }

    @Override
    public void process(SinkDocument doc, SinkRecord orig) {

        if(predicate.test(getConfig())) {
            doc.getKeyDoc().ifPresent(kd ->
                    fields.forEach(f -> doProjection(f,kd))
            );
        }

        getNext().ifPresent(pp -> pp.process(doc,orig));
    }

}
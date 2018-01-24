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
import com.everydots.kafka.connect.mongodb.processor.field.projection.FieldProjector;
import org.apache.kafka.connect.sink.SinkRecord;
import org.bson.BsonDocument;
import org.bson.BsonValue;

public class PartialValueStrategy implements IdStrategy {

    private FieldProjector fieldProjector;

    public PartialValueStrategy(FieldProjector fieldProjector) {
        this.fieldProjector = fieldProjector;
    }

    @Override
    public BsonValue generateId(SinkDocument doc, SinkRecord orig) {

        //NOTE: this has to operate on a clone because
        //otherwise it would interfere with further projections
        //happening later in the chain e.g. for value fields
        SinkDocument clone = doc.clone();
        fieldProjector.process(clone,orig);
        //NOTE: If there is no key doc present the strategy
        //simply returns an empty BSON document per default.
        return clone.getValueDoc().orElseGet(() -> new BsonDocument());

    }

}

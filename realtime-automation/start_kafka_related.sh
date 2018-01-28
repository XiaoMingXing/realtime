#!/bin/bash

# start business system
export PROJECT_HOME=~/projects/realtime
export CONFLUENT_HOME=~/projects/confluent-4.0.0

prepare(){
    sudo su -
    cd ${PROJECT_HOME}
    git pull
}

#start confluent kafka rest
run_kafka_rest(){
     echo "Run Kafka Rest ..."
     cd ${CONFLUENT_HOME}
     bin/kafka-rest-start etc/kafka-rest/kafka-rest.properties &
}

# run kafka streams transformation
run_kafka_streams(){
     echo "Run Kafka Streams ..."
     cd ${PROJECT_HOME}/realtime-kafka-streams
     mvn clean package
     cd target
     java -cp realtime-kafka-streams-1.0-SNAPSHOT-jar-with-dependencies.jar com.everydots.kafka.streams.Transformer &
}



# Run kafka connector
run_kafka_connector(){
    echo "Run Kafka Connector ..."
    #build connector package
    cd ${PROJECT_HOME}/realtime-kafka-connectors
    mvn clean package

    #run the connector
    ${CONFLUENT_HOME}/bin/connect-standalone config/worker.properties config/connect.properties &
}

prepare

run_kafka_rest
run_kafka_streams
run_kafka_connector

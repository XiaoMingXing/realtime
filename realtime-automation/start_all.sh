#!/bin/bash

# start business system
export PROJECT_HOME=~/projects/realtime
export CONFLUENT_HOME=~/projects/confluent-4.0.0
export MONGODB_DATA_PATH=~/Desktop/Developer

run_buz_sys(){
     echo "Run Business System ..."
     cd ${PROJECT_HOME}/realtime-business-system
     npm install
     bower install
     npm start &
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

# Run mongoDB
run_mongo(){
    echo "Running Mongo DB ..."
    #cd ${MONGODB_DATA_PATH}
    #mongod --dbpath mongodb/ &
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


# Run NodeJS app consume data from MongoDB
run_node_app(){
    echo "Run Node App ..."
    cd ${PROJECT_HOME}/realtime-service
    npm install
    npm start &
    return
}

# Run Dashboard app
run_dashboard(){
    echo "Run Dashboard ..."
    cd ${PROJECT_HOME}/realtime-dashboard
    npm run dev -- -p 3001
}

run_buz_sys
run_kafka_rest
run_kafka_streams
run_mongo
run_kafka_connector

run_node_app
run_dashboard
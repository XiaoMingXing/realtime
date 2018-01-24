# kill thread by port 
`
lsof -n -i4TCP:3000 | grep LISTEN

`

# How to run each components

## Business components

`
cd {PROJECT_HOME}/realtime-react
npm start
`
After start successfully, the business system will run with port 8088

## confluent kafka rest

- download confluent package from `https://www.confluent.io/download/`
- unzip file and add below shell into `~/.bashrc'
`
 export CONFLUENT_HOME=~/path/of/confluent
`
- run below command to make the config works
`
source ~/.bashrc
`
- config files inside of `${CONFLUENT_HOME}/etc/kafka-rest/kafka-rest.properties`

  + change the `bootstrap.servers` to remote kafka address
  `
  bootstrap.servers=http://184.73.79.82:9092
  `
  + add cross domain access support to allow business system to access with HTTP
  `
  access.control.allow.origin=*
  access.control.allow.methods=GET,POST,PUT,DELETE,OPTIONS,HEAD
  `

- run `kafka-rest` with below commands
`
cd ${CONFLUENT_HOME}
bin/kafka-rest-start etc/kafka-rest/kafka-rest.properties
`

## Run kafka stream

currently it's just a main method with some logic code to transform the messages
- If you are running in dev mode, just run the `Main.java`
- If you are running in prod mode, the can use below command:
 `jar realtime-kafka-streams.jar Pipe.java`
 
## Run mongo DB

- go into the mongo db storage path

`
 cd /path/to/save/mongo/data  (cd ~/Desktop/Developer)
`
- run below commands
`
mongod --dbpath mongodb/
`

 
## Run kafka connector

- first run `mvn clean package` to build package
- run below command to go inside of project folder
`
cd ${PROJECT_FOLDER}/realtime-kafka-mongo-connector
`
- run kafka connector with below commands
`
 ${CONFLUENT_HOME}/bin/connect-standalone config/worker.properties config/connect.properties
`
 
## run nodeJs app
- run below command to go inside of project folder
`
cd ${PROJECT_FOLDER}/realtime-service
`
- run script below
`
 npm start
`

## run dashboard app

- run below command to go inside of project folder
`
cd ${PROJECT_FOLDER}/realtime-dashboard
`
- run script below
`
 npm run dev -- -p 3001
`


# How to verify each componets



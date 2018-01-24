## Source message format from browser
```json
{
  "user":{"id":"9990"},
  "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
  "action":{"type":"click","code":"008"}
}
```


## Sink format in MongoDB
```json
{
  "id":"9990",
  "day":"22",
  "month":"Jan",
  "week":"3",
  "year":"2018",
  "device":"web",
  "browser":"chrome",
  "action":"view",
  "code":"1"
}
```

##use below commands to consume message into console

```shell
bin/kafka-console-consumer --bootstrap-server 184.73.79.82:9092 --topic sink-topic
```

###use below commands to run kafka-rest
```sbtshell
bin/kafka-rest-start etc/kafka-rest/kafka-rest.properties
```

### use below commands to run kafka mongoDb connector

```sbtshell
$CONFLUENT_HOME/bin/connect-standalone config/worker.properties config/connect.properties
```

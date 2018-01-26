import React, {Component} from "react";
import axios from "axios";

class UserActivity extends Component {

    KAFKA_REST = "http://localhost:8082/";
    CONSUMER_NAME = "my_json_consumer";
    CONSUMER_INSTANCE_NAME = "my_consumer_instance";
    TOPICS = ["topic-test2"];
    TOPICS1 = ["streams-pipe-output"];

    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            message: JSON.stringify({
                "records": [{
                    "value": {
                        "user": "customer1",
                        "agent": navigator.userAgent,
                        "action": {"type": "click", "code": "008"}
                    }
                }]
            }),
            infoMsg: '',
            consumedMessage: [],
            config: {
                broker_url: "http://localhost:8082",
                topic: "topic-test2"
            }
        };
        axios.defaults.headers.post['Content-Type'] = "application/vnd.kafka.json.v2+json";
        axios.defaults.headers.post['Accept'] = "application/vnd.kafka.v2+json";

        this.checkKafkaTopics = this.checkKafkaTopics.bind(this);
        this.initKafka = this.initKafka.bind(this);
        this.ProduceMessage = this.ProduceMessage.bind(this);
        this.ConsumeMessage = this.ConsumeMessage.bind(this);
    }


    checkKafkaTopics() {
        let _this = this;
        axios
            .get(this.KAFKA_REST + "topics")
            .then(result => {
                if (result.status !== 200) {
                    this.errorMessage = "Kafka connection error!";
                    return
                }
                _this.setState({topics: result.data});
            })
    }

    initKafka() {

        let _this = this;

        axios.post(this.KAFKA_REST + "consumers/" + this.CONSUMER_NAME, JSON.stringify({
            "name": this.CONSUMER_INSTANCE_NAME,
            "format": "json",
            "auto.offset.reset": "latest"
        })).then(result => {
            if (result.status !== 200) {
                return
            }
            axios.post(result.data.base_uri + "/subscription",
                JSON.stringify({"topics": this.TOPICS}))
                .then(result => {
                    _this.setState({infoMsg: "success"});
                    console.log(result);
                })
        });
    }

    ProduceMessage() {
        if (!JSON.parse(this.state.message)) {
            console.log("JSON format error");
            return
        }
        let message = JSON.parse(this.state.message);
        axios.post(this.KAFKA_REST + "topics/" + this.TOPICS, JSON.stringify(message))
            .then(result => console.log(result))
    }

    ConsumeMessage() {
        let _this = this;
        let headerConfig = {
            headers: {
                "Accept": "application/vnd.kafka.json.v2+json"
            }
        };
        axios
            .get(this.KAFKA_REST + "consumers/" + this.CONSUMER_NAME + "/instances/" +
                this.CONSUMER_INSTANCE_NAME + "/records", headerConfig)
            .then(result => _this.setState({consumedMessage: result.data}))
    }

    topicList = function (topics) {
        if (!topics || !topics.length) return;
        const listTopics = topics.map((topic) =>
            <li>{topic}</li>
        );
        return (
            <ul>{listTopics}</ul>
        );
    };

    handleChange(e) {
        this.setState({message: e.target.value});
    }

    render() {

        let topics = this.state.topics.map((topic) => {
            return (<li>{topic}</li>)
        });

        let textAreaStyle = {
            marginLeft: "0",
            marginRight: "0"
        };

        return (<div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">User Activity Analysis</h3>
                </div>
                {this.state.infoMsg}
                <div className="panel-body text-left">
                    <div className="form-group row">
                        <label className="initKafkaButton">Init Kafka: </label>
                        <button type="button" className="btn btn-info" onClick={() => this.initKafka()}>Init Kafka
                        </button>
                    </div>
                    <div className="form-group row">
                        <label className="topicCheckButton">Check Topics: </label>
                        <button type="button" className="btn btn-primary" onClick={() => this.checkKafkaTopics()}>Check
                            Kafka Topics
                        </button>
                        <ul>{topics}</ul>
                    </div>
                    <div className="form-group">
                        <div className="row" style={textAreaStyle}>
                            <label className="sendMessageButton">Send messages: </label>
                            <textarea className="form-control" id="messagesToSend" rows="10"
                                      onChange={this.handleChange.bind(this)}
                                      value={this.state.message} placeholder="Write message here..."/>
                        </div>
                        <div className="row">
                            <button type="button" className="btn btn-info" onClick={() => this.ProduceMessage()}>Send
                                Messages
                            </button>
                        </div>

                    </div>
                    <div className="form-group row">
                        <label className="consumeMessageButton">Consume messages: </label>
                        <button type="button" className="btn btn-info" onClick={() => this.ConsumeMessage()}>
                            ConsumeMessage
                        </button>
                        <div>
                            {JSON.stringify(this.state.consumedMessage)}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default UserActivity;

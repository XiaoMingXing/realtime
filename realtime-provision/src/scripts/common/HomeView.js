import React, {Component} from "react";
import axios from "axios";

class Main extends Component {
    constructor(props) {
        super(props);
        this.provisionServer = this.provisionServer.bind(this);
        this.destroyServer = this.destroyServer.bind(this);
        this.destroy = this.destroy.bind(this);
        this.setup = this.setup.bind(this);

        this.state = {
            req_body: {
                project: "tw-data-engineering-demo",
                region: "asia-southeast1",
                zone: "asia-southeast1-b",
                bucket_name: "realtime-bucket",
                cluster_name: "new-cluster",
                master_num: 1,
                worker_num: 2,

            },
            realtime_req_body: {
                project: "tw-data-engineering-demo",
                region: "asia-southeast1",
                zone: "asia-southeast1-b",
                customer: "customer5"
            },
            links: {},
            loading: false

        }
    }


    provisionServer() {
        axios.post("http://localhost:9090/provision_cluster", this.state.req_body).then(function (res) {
            console.log(res);
        })
    }

    destroyServer() {
        axios.post("http://localhost:9090/delete_cluster", this.state.req_body).then(function (res) {
            console.log(res);
        })
    }

    setup() {
        let _this = this;
        this.setState({loading: true});
        axios.post("http://localhost:9090/realtime/gcloud/setup", this.state.realtime_req_body)
            .then(function (res) {
                return axios.get("http://localhost:9090/realtime/links/customer5")
            })
            .then(function (res) {
                _this.setState({links: res.data});
            })
    }

    destroy() {
        axios.post("http://localhost:9090/realtime/gcloud/destroy", this.state.realtime_req_body)
            .then(function (res) {
                console.log(res);
            })
    }


    render() {

        let _this = this;
        let content = Object.keys(_this.state.links).map(function (key) {
            return <li><a href={_this.state.links[key]}>{key}</a></li>
        });

        return (<div>

            <h1>Welcome to home page!</h1>
            <div>
                <button type="button" className="btn btn-default navbar-btn" onClick={() => this.provisionServer()}>
                    Provision Server
                </button>
                <button type="button" className="btn btn-default navbar-btn" onClick={() => this.destroyServer()}>
                    Delete Server
                </button>
            </div>

            <div>
                <button type="button" className="btn btn-default navbar-btn" onClick={() => this.setup()}>
                    Setup in Google Cloud
                </button>
                <button type="button" className="btn btn-default navbar-btn" onClick={() => this.destroy()}>
                    Destroy
                </button>

            </div>

            <div className="links">
                <ul>
                    {content}
                </ul>
            </div>

        </div>);
    }
}

export default Main;

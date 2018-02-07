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
            }

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
        axios.post("http://localhost:9090/realtime/gcloud/setup", this.state.realtime_req_body)
            .then(function (res) {
                console.log(res);
            })
    }

    destroy() {
        axios.post("http://localhost:9090/realtime/gcloud/destroy", this.state.realtime_req_body)
            .then(function (res) {
                console.log(res);
            })
    }


    render() {
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

        </div>);
    }
}

export default Main;

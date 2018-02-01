import React, {Component} from "react";

class Main extends Component {
    constructor(props) {
        super(props);
        this.provisionServer = this.provisionServer.bind(this);
    }

    provisionServer(){
        console.log("Clicked");
    }


    render() {
        return (<div>

            <h1>Welcome to home page!</h1>

            <button type="button" className="btn btn-default navbar-btn" onClick={() => this.provisionServer()}>
                ProvisionServer
            </button>

        </div>);
    }
}

export default Main;

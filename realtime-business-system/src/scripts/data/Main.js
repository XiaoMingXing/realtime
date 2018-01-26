import React, {Component} from "react";
import LogAnalysis from "./batch/LogAnalysis";
import UserActivity from "./realtime/UserActivity";
import {Link, Route, Switch} from "react-router-dom";


class Main extends Component {

    render() {
        return (<div>
            <div className="col-md-3">
                <ul className="list-group">
                    <Link to="/data" className="list-group-item active">
                        <h4 className="list-group-item-heading">
                            <span>Realtime</span>
                        </h4>
                        <p className="list-group-item-text">

                        </p>
                    </Link>
                    <Link to="/data/batch" className="list-group-item">
                        <h4 className="list-group-item-heading">
                            <span>Batch</span>
                        </h4>
                        <p className="list-group-item-text">

                        </p>
                    </Link>
                </ul>
            </div>
            <div className="col-md-8">
                <Switch>
                    <Route exact path='/data' component={UserActivity}/>
                    <Route exact path='/data/batch' component={LogAnalysis}/>
                </Switch>
            </div>
        </div>);
    }
}

export default Main;

import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom'
import HomeView from "../common/HomeView";

class Main extends Component {

    render() {
        return (<div>
            <Switch>
                <Route exact path="/" component={HomeView}/>
            </Switch>

        </div>);
    }
}

export default Main;

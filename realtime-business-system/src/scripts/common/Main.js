import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom'
import DataMainView from "../data/Main";
import HomeView from "../common/HomeView";
import MLMainView from "../ml/Main";
import AboutUsMainView from "../about/Main";

class Main extends Component {

    render() {
        return (<div>
            <Switch>
                <Route exact path="/" component={HomeView}/>
                <Route path="/ml" component={MLMainView}/>
                <Route path="/data" component={DataMainView}/>
                <Route path="/about" component={AboutUsMainView}/>
            </Switch>

        </div>);
    }
}

export default Main;

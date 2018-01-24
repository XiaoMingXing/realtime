import React, {Component} from "react";
import { Switch, Route } from 'react-router-dom'
import BigDataMainView from "../bigdata/Main";
import HomeView from "../common/HomeView";
import PreSaleMainView from "../preSale/Main";

class Main extends Component {

    render() {
        return (<div>
            <Switch>
                <Route exact path="/" component={HomeView} />
                <Route path="/preSale" component={PreSaleMainView} />
                <Route path="/bigData" component={BigDataMainView} />
            </Switch>

        </div>);
    }
}

export default Main;

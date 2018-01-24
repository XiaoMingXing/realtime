import React, {Component} from "react";
import Storage from "./forecast/Storage";
import LenovoCase from "./forecast/LenovoCase";
import StationPortrait from "./statistics/StationPortrait";
import UserActivity from "./realtime/UserActivity";
import {Link, Route, Switch} from "react-router-dom";


class Main extends Component {

    render() {
        return (<div>
            <div className="col-md-3">
                <ul className="list-group">
                    <Link to="/bigData" className="list-group-item active">
                        <h4 className="list-group-item-heading">
                            <span>用户行为分析</span>
                            <span className="badge pull-right">14</span>
                        </h4>
                        <p className="list-group-item-text">

                        </p>
                    </Link>
                    <Link to="/bigData/portrait" className="list-group-item">
                        <h4 className="list-group-item-heading">
                            <span>数据统计分析</span>
                            <span className="badge pull-right">14</span>
                        </h4>
                        <p className="list-group-item-text">

                        </p>
                    </Link>
                    <Link to="/bigData/storage" className="list-group-item">
                        <h4 className="list-group-item-heading">
                            <span>数据预测</span>
                            <span className="badge pull-right">14</span>
                        </h4>
                        <p className="list-group-item-text">

                        </p>
                    </Link>
                    <Link to="/bigData/dataGov" className="list-group-item">
                        <h4 className="list-group-item-heading">
                            <span>数据治理</span>
                            <span className="badge pull-right">0</span>
                        </h4>
                        <p className="list-group-item-text">
                        </p>
                    </Link>
                    <Link to="/bigData/lenovo" className="list-group-item">
                        <h4 className="list-group-item-heading">
                            <span>Lenovo手机维修</span>
                            <span className="badge pull-right">2</span>
                        </h4>
                        <p className="list-group-item-text">
                        </p>
                    </Link>
                </ul>
            </div>
            <div className="col-md-8">
                <Switch>
                    <Route exact path='/bigData' component={UserActivity}/>
                    <Route path='/bigData/storage' component={Storage}/>
                    <Route path='/bigData/portrait' component={StationPortrait}/>
                    <Route path='/bigData/lenovo' component={LenovoCase}/>
                </Switch>
            </div>
        </div>);
    }
}

export default Main;

import React, {Component} from "react";
import axios from "axios";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

class SupplyChainForecast extends Component {

    constructor() {
        super();
        this.state = {items: []};
    }

    componentDidMount() {
        /*fetch(`http://localhost:5000/`)
         .then(result=>this.formatItems(result.json()))
         .then(items=>this.setState({items}));*/

        /*client({method: 'GET', path: 'http://localhost:5000/'}).done(response => {
         debugger;
         this.setState({items: this.formatItems(response.json())});
         });*/
        var _this = this;
        axios
            .get("http://localhost:5000/predict")
            .then(function (result) {
                console.log(result);
                return _this.formatItems(result.data);
            })
            .then(items=>_this.setState({items}));
    }

    formatItems(items) {
        var yhat_lower_results = [];
        if (typeof items === 'object' && items['yhat_lower']) {
            for (var index in items['yhat_lower']) {
                yhat_lower_results.push({
                    yhat_lower: items['yhat_lower'][index],
                    name: index
                });
            }
        }
        return yhat_lower_results;
    }

    render() {

        return (<div className="SupplyChainForecase">
            <LineChart width={600} height={300} data={this.state.items}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="yhat_lower" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </div>);
    }
}

export default SupplyChainForecast;
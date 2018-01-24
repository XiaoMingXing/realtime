import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';
import React, {Component} from "react";

export default class DistributionBar extends Component {

    constructor(props) {
        super(props);

        let data = [
            {name: "PV", Chrome: 4000, Safari: 2400},
        ];
    }

    render() {
        const {data} = this.props;
        return (
            <BarChart width={400} height={200} data={data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="Chrome" fill="#8884d8"/>
                <Bar dataKey="Safari" fill="#82ca9d"/>
            </BarChart>
        )
    }
}

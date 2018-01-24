import React, {Component} from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

class MobileRepairTimeBar extends Component {

    constructor(props) {
        super(props);

        /*const problemData = [
         {name: '-1天', 'Charging': 19048.0},
         {name: '0天', 'Charging': 19421.0},
         {name: '1天', 'Charging': 4550.0},
         {name: '2天', 'Charging': 3093.0},
         {name: '3天', 'Charging': 2821.0},
         {name: '4天', 'Charging': 2635.0},
         {name: '5天', 'Charging': 1574.0},
         {name: '6天', 'Charging': 1293.0},
         {name: '7天', 'Charging': 1002.0},
         {name: '8天', 'Charging': 863.0},
         {name: '9天', 'Charging': 730.0},
         {name: '10天', 'Charging': 496.0},
         {name: '11天', 'Charging': 447.0},
         {name: '12天', 'Charging': 343.0},
         {name: '13天', 'Charging': 303.0},
         {name: '14天', 'Charging': 256.0},
         {name: '15天', 'Charging': 196.0},
         {name: '16天', 'Charging': 175.0},
         {name: '17天', 'Charging': 146.0},
         {name: '18天', 'Charging': 141.0},
         {name: '19天', 'Charging': 127.0},
         {name: '20天', 'Charging': 73.0},
         {name: '21天', 'Charging': 68.0},
         {name: '22天', 'Charging': 75.0},
         {name: '23天', 'Charging': 64.0},
         {name: '24天', 'Charging': 48.0},
         {name: '25天', 'Charging': 32.0},
         {name: '26天', 'Charging': 38.0},
         {name: '27天', 'Charging': 27.0},
         {name: '28天', 'Charging': 15.0},
         {name: '29天', 'Charging': 20.0},
         {name: '30天', 'Charging': 21.0},
         {name: '31天', 'Charging': 22.0},
         {name: '32天', 'Charging': 24.0},
         {name: '33天', 'Charging': 18.0},
         {name: '34天', 'Charging': 13.0},
         {name: '35天', 'Charging': 12.0},
         {name: '36天', 'Charging': 12.0},
         {name: '37天', 'Charging': 3.0},
         {name: '38天', 'Charging': 5.0},
         {name: '39天', 'Charging': 3.0},
         {name: '40天', 'Charging': 4.0},
         {name: '41天', 'Charging': 6.0},
         {name: '42天', 'Charging': 6.0},
         {name: '43天', 'Charging': 3.0},
         {name: '44天', 'Charging': 5.0},
         {name: '45天', 'Charging': 2.0},
         {name: '46天', 'Charging': 1.0},
         {name: '48天', 'Charging': 4.0},
         {name: '49天', 'Charging': 3.0},
         {name: '50天', 'Charging': 3.0},
         {name: '51天', 'Charging': 2.0},
         {name: '52天', 'Charging': 2.0},
         {name: '53天', 'Charging': 1.0},
         {name: '54天', 'Charging': 2.0},
         {name: '56天', 'Charging': 1.0},
         {name: '58天', 'Charging': 1.0},
         {name: '60天', 'Charging': 2.0},
         {name: '63天', 'Charging': 1.0},
         {name: '64天', 'Charging': 1.0},
         {name: '68天', 'Charging': 1.0},
         {name: '69天', 'Charging': 1.0},
         {name: '71天', 'Charging': 1.0},
         {name: '73天', 'Charging': 1.0},
         {name: '78天', 'Charging': 1.0},
         {name: '81天', 'Charging': 1.0},
         {name: '91天', 'Charging': 3.0},
         {name: '108天', 'Charging': 1.0}
         ];*/
        const problemData = [{ name: '-1天','Charging':429},
            { name: '0天','Charging':423},
            { name: '1天','Charging':346},
            { name: '2天','Charging':329},
            { name: '3天','Charging':315},
            { name: '4天','Charging':335},
            { name: '5天','Charging':287},
            { name: '6天','Charging':278},
            { name: '7天','Charging':249},
            { name: '8天','Charging':223},
            { name: '9天','Charging':215},
            { name: '10天','Charging':196},
            { name: '11天','Charging':183},
            { name: '12天','Charging':157},
            { name: '13天','Charging':136},
            { name: '14天','Charging':125},
            { name: '15天','Charging':109},
            { name: '16天','Charging':104},
            { name: '17天','Charging':102},
            { name: '18天','Charging':86},
            { name: '19天','Charging':78},
            { name: '20天','Charging':60},
            { name: '21天','Charging':52},
            { name: '22天','Charging':53},
            { name: '23天','Charging':48},
            { name: '24天','Charging':35},
            { name: '25天','Charging':28},
            { name: '26天','Charging':29},
            { name: '27天','Charging':23},
            { name: '28天','Charging':13},
            { name: '29天','Charging':19},
            { name: '30天','Charging':21},
            { name: '31天','Charging':17},
            { name: '32天','Charging':21},
            { name: '33天','Charging':14},
            { name: '34天','Charging':11},
            { name: '35天','Charging':12},
            { name: '36天','Charging':12},
            { name: '37天','Charging':3},
            { name: '38天','Charging':4},
            { name: '39天','Charging':3},
            { name: '40天','Charging':4},
            { name: '41天','Charging':6},
            { name: '42天','Charging':6},
            { name: '43天','Charging':3},
            { name: '44天','Charging':4},
            { name: '45天','Charging':2},
            { name: '46天','Charging':1},
            { name: '48天','Charging':3},
            { name: '49天','Charging':3},
            { name: '50天','Charging':3},
            { name: '51天','Charging':2},
            { name: '52天','Charging':2},
            { name: '53天','Charging':1},
            { name: '54天','Charging':2},
            { name: '56天','Charging':1},
            { name: '58天','Charging':1},
            { name: '60天','Charging':2},
            { name: '63天','Charging':1},
            { name: '64天','Charging':1},
            { name: '68天','Charging':1},
            { name: '69天','Charging':1},
            { name: '71天','Charging':1},
            { name: '73天','Charging':1},
            { name: '78天','Charging':1},
            { name: '81天','Charging':1},
            { name: '91天','Charging':3},
            { name: '108天','Charging':1}];
        const problemData2 = [{name: '-1天', 'Software': 432},
            {name: '0天', 'Software': 499},
            {name: '1天', 'Software': 399},
            {name: '2天', 'Software': 327},
            {name: '3天', 'Software': 285},
            {name: '4天', 'Software': 256},
            {name: '5天', 'Software': 199},
            {name: '6天', 'Software': 181},
            {name: '7天', 'Software': 150},
            {name: '8天', 'Software': 149},
            {name: '9天', 'Software': 118},
            {name: '10天', 'Software': 103},
            {name: '11天', 'Software': 102},
            {name: '12天', 'Software': 82},
            {name: '13天', 'Software': 87},
            {name: '14天', 'Software': 65},
            {name: '15天', 'Software': 57},
            {name: '16天', 'Software': 38},
            {name: '17天', 'Software': 40},
            {name: '18天', 'Software': 45},
            {name: '19天', 'Software': 43},
            {name: '20天', 'Software': 40},
            {name: '21天', 'Software': 30},
            {name: '22天', 'Software': 26},
            {name: '23天', 'Software': 25},
            {name: '24天', 'Software': 15},
            {name: '25天', 'Software': 12},
            {name: '26天', 'Software': 15},
            {name: '27天', 'Software': 14},
            {name: '28天', 'Software': 14},
            {name: '29天', 'Software': 9},
            {name: '30天', 'Software': 9},
            {name: '31天', 'Software': 6},
            {name: '32天', 'Software': 6},
            {name: '33天', 'Software': 5},
            {name: '34天', 'Software': 6},
            {name: '35天', 'Software': 4},
            {name: '36天', 'Software': 2},
            {name: '37天', 'Software': 1},
            {name: '38天', 'Software': 3},
            {name: '39天', 'Software': 2},
            {name: '40天', 'Software': 2},
            {name: '41天', 'Software': 4},
            {name: '42天', 'Software': 1},
            {name: '43天', 'Software': 1},
            {name: '45天', 'Software': 2},
            {name: '46天', 'Software': 1},
            {name: '47天', 'Software': 1},
            {name: '49天', 'Software': 1},
            {name: '51天', 'Software': 3},
            {name: '53天', 'Software': 1},
            {name: '55天', 'Software': 1},
            {name: '56天', 'Software': 1},
            {name: '57天', 'Software': 1},
            {name: '67天', 'Software': 1},
            {name: '69天', 'Software': 1},
            {name: '70天', 'Software': 1},
            {name: '72天', 'Software': 1},
            {name: '113天', 'Software': 1}];
        const problemData3 = [{name: '-1天', 'Touch Screen': 451},
            {name: '0天', 'Touch Screen': 408},
            {name: '1天', 'Touch Screen': 377},
            {name: '2天', 'Touch Screen': 370},
            {name: '3天', 'Touch Screen': 378},
            {name: '4天', 'Touch Screen': 384},
            {name: '5天', 'Touch Screen': 348},
            {name: '6天', 'Touch Screen': 329},
            {name: '7天', 'Touch Screen': 299},
            {name: '8天', 'Touch Screen': 278},
            {name: '9天', 'Touch Screen': 274},
            {name: '10天', 'Touch Screen': 243},
            {name: '11天', 'Touch Screen': 234},
            {name: '12天', 'Touch Screen': 205},
            {name: '13天', 'Touch Screen': 176},
            {name: '14天', 'Touch Screen': 171},
            {name: '15天', 'Touch Screen': 142},
            {name: '16天', 'Touch Screen': 123},
            {name: '17天', 'Touch Screen': 127},
            {name: '18天', 'Touch Screen': 105},
            {name: '19天', 'Touch Screen': 110},
            {name: '20天', 'Touch Screen': 69},
            {name: '21天', 'Touch Screen': 73},
            {name: '22天', 'Touch Screen': 74},
            {name: '23天', 'Touch Screen': 74},
            {name: '24天', 'Touch Screen': 56},
            {name: '25天', 'Touch Screen': 52},
            {name: '26天', 'Touch Screen': 55},
            {name: '27天', 'Touch Screen': 36},
            {name: '28天', 'Touch Screen': 40},
            {name: '29天', 'Touch Screen': 37},
            {name: '30天', 'Touch Screen': 36},
            {name: '31天', 'Touch Screen': 30},
            {name: '32天', 'Touch Screen': 34},
            {name: '33天', 'Touch Screen': 23},
            {name: '34天', 'Touch Screen': 21},
            {name: '35天', 'Touch Screen': 19},
            {name: '36天', 'Touch Screen': 20},
            {name: '37天', 'Touch Screen': 26},
            {name: '38天', 'Touch Screen': 15},
            {name: '39天', 'Touch Screen': 26},
            {name: '40天', 'Touch Screen': 12},
            {name: '41天', 'Touch Screen': 9},
            {name: '42天', 'Touch Screen': 20},
            {name: '43天', 'Touch Screen': 12},
            {name: '44天', 'Touch Screen': 17},
            {name: '45天', 'Touch Screen': 14},
            {name: '46天', 'Touch Screen': 11},
            {name: '47天', 'Touch Screen': 11},
            {name: '48天', 'Touch Screen': 8},
            {name: '49天', 'Touch Screen': 7},
            {name: '50天', 'Touch Screen': 12},
            {name: '51天', 'Touch Screen': 6},
            {name: '52天', 'Touch Screen': 4},
            {name: '53天', 'Touch Screen': 5},
            {name: '54天', 'Touch Screen': 7},
            {name: '55天', 'Touch Screen': 5},
            {name: '56天', 'Touch Screen': 1},
            {name: '57天', 'Touch Screen': 3},
            {name: '58天', 'Touch Screen': 4},
            {name: '59天', 'Touch Screen': 3},
            {name: '60天', 'Touch Screen': 1},
            {name: '62天', 'Touch Screen': 3},
            {name: '63天', 'Touch Screen': 3},
            {name: '65天', 'Touch Screen': 3},
            {name: '66天', 'Touch Screen': 2},
            {name: '67天', 'Touch Screen': 2},
            {name: '68天', 'Touch Screen': 4},
            {name: '69天', 'Touch Screen': 2},
            {name: '71天', 'Touch Screen': 2},
            {name: '72天', 'Touch Screen': 2},
            {name: '73天', 'Touch Screen': 1},
            {name: '75天', 'Touch Screen': 3},
            {name: '76天', 'Touch Screen': 3},
            {name: '77天', 'Touch Screen': 3},
            {name: '78天', 'Touch Screen': 1},
            {name: '80天', 'Touch Screen': 2},
            {name: '82天', 'Touch Screen': 2},
            {name: '83天', 'Touch Screen': 1},
            {name: '84天', 'Touch Screen': 2},
            {name: '85天', 'Touch Screen': 2},
            {name: '86天', 'Touch Screen': 1},
            {name: '96天', 'Touch Screen': 1},
            {name: '99天', 'Touch Screen': 1},
            {name: '103天', 'Touch Screen': 1},
            {name: '112天', 'Touch Screen': 1},
            {name: '115天', 'Touch Screen': 1},
            {name: '117天', 'Touch Screen': 1},
            {name: '131天', 'Touch Screen': 1}];

        this.state = {
            line: 'Software',
            line2: 'Charging',
            line3: 'Touch Screen',
            data: problemData,
            problemData: problemData,
            problemData2: problemData2,
            problemData3: problemData3
        }

        this.combineData(problemData, problemData2);
        this.combineData(problemData, problemData3);
    }

    combineData(data1, data2) {
        for (var index = 0; index < data2.length; index++) {
            var item = data2[index];
            var currentItem = this.findCurrentItem(item.name, data1);
            if (!currentItem) {
                continue;
            }
            for (var key in item) {
                if (key !== 'name') {
                    currentItem[key] = item[key];
                }
            }
        }
    }

    findCurrentItem(name, data) {
        for (var index = 0; index < data.length; index++) {
            var item = data[index];
            if (item.name === name) {
                return item;
            }
        }
    }

    render() {
        return (<div className="radar-chart">

            {/* <div className="col-md-8 pull-left">
             <label>问题类型: </label>
             <select id="dropdown-size-medium"
             onChange={event => {
             if (event.target.value === 'Software') {
             this.setState({
             line: event.target.value,
             data: this.state.problemData
             });
             } else if (event.target.value === 'Charging') {
             this.setState({
             line: event.target.value,
             data: this.state.problemData2
             })
             } else {
             this.setState({
             line: event.target.value,
             data: this.state.problemData3
             })
             }
             }}>
             <option key="Software" value="Software">Software</option>
             <option key="Charging" value="Charging">Charging</option>
             <option key="RF Performance" value="RF Performance">RF Performance</option>
             </select>
             </div>*/}

            <BarChart width={1000} height={500} data={this.state.data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey={this.state.line} fill="#8884d8" minPointSize={5}/>
                <Bar dataKey={this.state.line2} fill="#82ca9d" minPointSize={10}/>
                <Bar dataKey={this.state.line3} fill="#ccc" minPointSize={6}/>
            </BarChart>
        </div>);
    }
}

export default MobileRepairTimeBar;
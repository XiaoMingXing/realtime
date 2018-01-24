import React, {Component} from "react";
import Chart from "chart.js";
import ProgressBar from "progressbar.js";

class LenovoCase extends Component {

    constructor(props) {

        super(props);

        const data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true
        };

        this.state = {
            data: data,
            options: options,
        };

        this.hvpParts = null;

        this.style = {
            width: 800
        };

        this.radarStyle = {
            width: 800
        }
    }

    render() {
        const progressBarStyle = {
            margin: "20px",
            width: "200px",
            height: "100px"
        };

        const mapStyle = {
            position: "relative",
            width: "1000px",
            height: "600px"
        };


        return (<div>
            {/*<div id="india" style={mapStyle}></div>*/}

            <div className="openCaseChart" style={this.radarStyle}>
                <canvas id="openCaseChart"/>
            </div>

            <div className="hvpPartsChart" style={this.radarStyle}>
                <canvas id="hvpPartsChart"/>
            </div>

            <div className="doughnutChart" style={this.radarStyle}>
                <canvas id="doughnutChart"/>
            </div>
            <div className="partsKPIChart" style={this.radarStyle}>
                <canvas id="partsKPIChart"/>
            </div>
            <div className="stackBarChart" style={this.radarStyle}>
                <canvas id="stackBarChart"/>
            </div>
            <div className="barChart" style={this.style}>
                <canvas id="myChart"/>
            </div>
            <div className="radarChart" style={this.radarStyle}>
                <canvas id="radarChart"/>
            </div>
            <div>
                <div className="progressBar" style={progressBarStyle}></div>
                <div id="circleChart" style={progressBarStyle}>

                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#ec5e30" strokeWidth="8"/>
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#e6e6e6" strokeWidth="8"
                                strokeDasharray="251.2" strokeDashoffset="58.16"/>
                        <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255, 87, 34, 0.5)" strokeWidth="8"
                                strokeDasharray="251.2" strokeDashoffset="238.16"/>
                        <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(248,168,144,0.58)" strokeWidth="8"
                                strokeDasharray="251.2" strokeDashoffset="108.16"/>

                        <circle cx="40" cy="40" r="23" fill="none" stroke="#e6e6e6" strokeWidth="8"/>
                        <circle cx="40" cy="40" r="23" fill="none" stroke="#559e6c" strokeWidth="8"
                                strokeDasharray="251.2" strokeDashoffset="238.30"/>
                        <circle cx="40" cy="40" r="23" fill="none" stroke="rgba(34, 125, 41, 0.5)" strokeWidth="8"
                                strokeDasharray="251.2" strokeDashoffset="208.30"/>
                        <circle cx="40" cy="40" r="23" fill="none" stroke="rgba(151, 193, 166, 0.56)" strokeWidth="8"
                                strokeDasharray="251.2" strokeDashoffset="151.30"/>
                        <text x="25" y="38" fontFamily="Verdana" fontSize="5" color="#559e6c" fill="#559e6c">
                            67%(1BD)
                        </text>
                        <text x="25" y="48" fontFamily="Verdana" fontSize="5" color="#559e6c" fill="#ec5e30">
                            84%(3BD)
                        </text>
                    </svg>
                </div>
                <div className="mapContainer">

                </div>
            </div>
        </div>);
    }

    componentDidMount() {

        if (this.hvpParts) this.hvpParts.destroy();


        /*HVP charts*/

        var hvpParts = document.getElementById("hvpPartsChart").getContext("2d");

        this.hvpParts = new Chart(hvpParts, {
            type: 'bar',
            data: {
                labels: ["TP LCM Ass'y", "Main Board", "LCD Module/LCM", "PLANAR, PCBA", "TP"],
                datasets: [{
                    label: 'HVP amount for different part type',
                    data: [5310, 2504, 4, 2, 1],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',

                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true
            }
        });


        /*opencase*/

        new Chart(document.getElementById("openCaseChart").getContext("2d"), {
            type: 'bar',
            data: {
                labels: ['In Warranty', 'Out Of Warranty'],
                datasets: [{
                    label: 'warrantly status parts',
                    data: [14438, 2292],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true
            }
        });

        /*doughnut chart*/
        new Chart(document.getElementById("doughnutChart"), {
            type: 'doughnut',
            data: {
                labels: ["TP LCM Ass'y", "Main Board", "Battery", "FPC", "Speaker", "Others"],
                datasets: [
                    {
                        label: "parts",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                        data: [75, 40, 40, 14, 9, 30]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Long Tail RTAT % for different parts'
                }
            }
        });


        /*bar chart*/
        var bar = new ProgressBar.SemiCircle(".progressBar", {
            strokeWidth: 6,
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            svgStyle: null,
            text: {
                value: '',
                alignToBottom: false
            },
            from: {color: '#ED6A5A'},
            to: {color: '#559e6c'},
            // Set default step function for all animate calls
            step: (state, bar) => {
                bar.path.setAttribute('stroke', state.color);
                var value = Math.round(bar.value() * 100);
                if (value === 0) {
                    bar.setText('');
                } else {
                    bar.setText("48%");
                }

                bar.text.style.color = state.color;
                bar.text.style.bottom = "10px";
                bar.text.style.fontSize = "1.6em";
            }
        });

        bar.text.style.fontSize = '1.6rem';
        bar.animate(0.48);


        /*Parts KPI Chart*/
        var partsKPIChart = document.getElementById("partsKPIChart").getContext("2d");
        var partsKPI = {
            labels: ['USB Cable', 'Charger/Adapter', 'Sub Board', 'Motor', 'Battery', 'Antenna', 'Speaker', 'FPC', 'Microphone', 'Camera', 'Earphone', 'Main Board', 'Receiver', 'TP LCM Ass\'y', 'Mechanical Parts', 'Metal', 'Cable', 'Key'],
            datasets: [{
                label: "Parts PAL(1BD)",
                data: [79.99, 74.29, 69.32, 67.07, 66.72, 66.67, 65.92, 64.74, 64.58, 64.11, 60.14, 59.49, 58.97, 57.91, 57.63, 42.86, 36.84, 36.36],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255,99,132,1)'
            }, {
                label: "Parts PAL(3BD)",
                data: [85.79, 85.71, 78.61, 76.65, 76.66, 78.57, 77.95, 75.44, 77.08, 76.45, 70.27, 76.78, 76.92, 72.15, 62.71, 42.86, 64.91, 63.64],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)'
            }]
        };

        this.partChart = new Chart(partsKPIChart, {
            type: 'bar',
            data: partsKPI,
            stacked: true
        });

        /*Stack bar chart*/
        var stackBarChart = document.getElementById("stackBarChart").getContext("2d");
        var barData = {
            labels: ["R-TAT", "apply parts", "wait to repair", "repair", "wait to pickup"],
            datasets: [{
                label: "Ambe Electronics-SCS",
                data: [0.4, 1.15, 0.13, 2.31, 1.56],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255,99,132,1)'
            }, {
                label: "STRENGTH SERVICES P.LTD-CPT",
                data: [0.09, 0.67, 0.2, 1.37, 1.7],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)'
            }, {
                label: "National Electronics-KOC",
                data: [0.32, 2.0, 0.03, 3.7, 1.43],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(255,99,132,1)',
            }]
        };

        this.stackBarChart = new Chart(stackBarChart, {
            type: 'bar',
            data: barData,
            stacked: true,
            options: {
                stacked: true
            }
        });


        /*Radar chart*/
        var radarCtx = document.getElementById("radarChart").getContext("2d");
        this.myRadarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ["Service Order Closed", "long Tail TAT%", "R-TAT(30BD)", "RRR(30CD)", "HVP"],
                datasets: [{
                    label: "STRENGTH SERVICES P.LTD-CPT",
                    fillColor: "rgb(245, 243, 180,0.6)",
                    borderColor: "rgba(234,234,149,1)",
                    data: [83, 95, 96, 88, 71]
                }/*, {
                    label: "Ambe Electronics-SCS",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    fillColor: "rgba(255,99,132,1)",
                    data: [37, 91, 78, 63, 55]
                }, {
                    label: "National Electronics-KOC",
                    fillColor: "rgba(179,181,198,0.2)",
                    borderColor: "rgba(255, 206, 86, 1)",
                    data: [13, 67, 77, 5, 43]
                }*/]
            },
            options: {
                scale: {
                    display: true
                }
            }
        });

        /**Map

         var bubble_map = new Datamap({
            element: document.getElementById('india'),
            scope: 'india',
            geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true,
                borderColor: '#444',
                borderWidth: 0.5,
                dataUrl: 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json'
                //dataJson: topoJsonData
            },
            fills: {
                'bad': '#D0021B',
                'good': '#5C9D6C',
                'unSelect': '#DDDDDD',
                defaultFill: '#fff'
            },
            data: {
                'JH': {fillKey: 'MINOR'},
                 'MH': {fillKey: 'MINOR'}
            },
            setProjection: function (element) {
                var projection = d3.geo.mercator()
                    .center([78.9629, 23.5937]) // always in [East Latitude, North Longitude]
                    .scale(1000);
                var path = d3.geo.path().projection(projection);
                return {path: path, projection: projection};
            }
        });



         let bubbles = [
         {
             latitude: 19.7515,
             longitude: 75.7139,
             fillKey: "bad",
             radius: 10,
             state: "mock city 3"
         },
         {
             latitude: 19.7515,
             longitude: 85.7139,
             fillKey: "unSelect",
             radius: 20,
             state: "Maharastra"
         },
         {
             centered: "AP",
             fillKey: "unSelect",
             radius: 10,
             state: "Andhra Pradesh"
         },
         {
             centered: "TN",
             fillKey: "bad",
             radius: 16,
             state: "Tamil Nadu"
         },
         {
             centered: "WB",
             fillKey: "bad",
             radius: 5,
             state: "West Bengal"
         },
         {
             latitude: 15.9129,
             longitude: 79.7400,
             fillKey: "bad",
             radius: 5,
             state: "mock city 1"
         },
         {
             latitude: 16.9129,
             longitude: 80.7400,
             fillKey: "bad",
             radius: 5,
             state: "mock city 2"
         },
         {
             centered: "MP",
             fillKey: "unSelect",
             radius: 15,
             state: "Madhya Pradesh"
         },
         {
             centered: "UP",
             fillKey: "good",
             radius: 8,
             state: "Uttar Pradesh"
         },
         {
             centered: "RJ",
             fillKey: "good",
             radius: 7,
             state: "Rajasthan"
         }
         ];

         setTimeout(() => { // only start drawing bubbles on the map when map has rendered completely.
            bubble_map.bubbles(bubbles, {
                popupTemplate: function (geo, data) {
                    return `<div class="hoverinfo">city: ${data.state}, Slums: ${data.radius}%</div>`;
                }
            });
        }, 1000);

         */

    }
}

export default LenovoCase;

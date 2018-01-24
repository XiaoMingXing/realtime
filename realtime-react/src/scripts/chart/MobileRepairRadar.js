import React, {Component} from 'react';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

class MobileRepairRadar extends Component {

    render() {

        const data = [
            { subject: 'PPI', A: 120, B: 110, fullMark: 150 },
            { subject: 'OpenCase', A: 98, B: 130, fullMark: 150 },
            { subject: 'PAL', A: 86, B: 130, fullMark: 150 },
            { subject: 'HAP', A: 99, B: 100, fullMark: 150 },
            { subject: 'R-TAT', A: 85, B: 90, fullMark: 150 }
        ];

        return (<div className="radar-chart">

            <RadarChart cx={200} cy={200} outerRadius={150} width={400} height={400} data={data}>
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis/>
            </RadarChart>
        </div>);
    }
}

export default MobileRepairRadar;
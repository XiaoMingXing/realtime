import React, {Component} from "react";
import MobileRepairStatistics from "../../chart/MobileRepairStatistics";
import MobileRepairRadar from "../../chart/MobileRepairRadar";
import MobileRepairTimeBar from "../../chart/MobileRepairTimeBar";


class StationPortrait extends Component {

    render() {

        var numberStyle = {
            color: 'red',
        };

        var numberStyleGreen = {
            color: 'green',
        };

        var blockStyle = {
            textAlign: 'left',
            marginLeft: '20px',
            fontSize: '20px'
        };

        return (<div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Overview</h3>
                </div>
                <div className="panel-body">
                    <div className="row" style={blockStyle}>
                        <div className="row"><h3>Touch Screen 维修情况(平均:2.21，采样200条)</h3></div>
                        <div className="row">
                            <b>最快: </b><span>Prudent Telecom Services(</span><span
                            style={numberStyleGreen}>0.49</span><span>)</span>
                        </div>
                        <div className="row">
                            <b>最慢: </b><span>MOBI QUEST(</span><span
                            style={numberStyle}>3.85</span><span>)</span>
                        </div>
                    </div>

                    <div className="row" style={blockStyle}>
                        <div className="row"><h3>RF Performance 维修情况(平均:3.10，采样200条)</h3></div>
                        <div className="row">
                            <b>最快: </b><span>ESC-SCD(</span><span
                            style={numberStyleGreen}>1.77</span><span>)</span>
                        </div>
                        <div className="row">
                            <b>最慢: </b><span>Simran Electronics(</span><span
                            style={numberStyle}>5.74</span><span>)</span>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div style={blockStyle} className="row">
                            <p style={numberStyleGreen}>ProductModel: A6020a46</p>
                            <p>RepairStation: MOBI QUEST</p>
                            <p>ReplacePartName:A6020a46 TP LCM ASSY GL&*712601000491 CS</p>
                            <p>ReplacePartStatus:Parts in service center</p>
                            <p>PartApplyTime:2016-12-31 17:11:10</p>
                            <p>RepairLevel:L2 (HW replacement exclude Motherboard)</p>
                            <p>ReplacementPartNumber:1</p>
                        </div>
                        <br />
                        <div style={blockStyle} className="row">
                            <p style={numberStyleGreen}>ProductModel: ZUK-Z1</p>
                            <p>RepairStation: MOBI QUEST</p>
                            <p>ReplacePartName:Z1 TP LCM ASSY_BK&*11574679-00 CS</p>
                            <p>ReplacePartStatus:Parts in service center</p>
                            <p>PartApplyTime:2016-11-18 19:02:36</p>
                            <p>RepairLevel:L2 (HW replacement exclude Motherboard)</p>
                            <p>ReplacementPartNumber:1</p>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">维修站Performance</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row pull-left">
                            <label>维修站: </label>
                            <select id="dropdown-size-medium">
                                <option key="K50a40" value="K50a40">Prudent Telecom Services</option>
                                <option key="A6000_16G" value="A6000_16G">ESC-SCD</option>
                                <option key="A7010a48" value="A7010a48">Simran Electronics</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <MobileRepairRadar />
                            </div>
                            <div className="col-md-8">
                                <MobileRepairTimeBar />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">维修站维修耗时</h3>
                    </div>
                    <div className="panel-body">
                        <MobileRepairStatistics />
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default StationPortrait;

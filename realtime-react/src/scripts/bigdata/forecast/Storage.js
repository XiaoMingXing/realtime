import React, {Component} from "react";

import SupplyChainForecast from "../../chart/SupplyChainForecast";

class Storage extends Component {

    render() {
        return (<div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Panel title</h3>
                    </div>
                    <div className="panel-body">
                        <SupplyChainForecast />
                    </div>
                </div>
        </div>);
    }
}

export default Storage;

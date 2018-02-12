import {Component} from 'react'
import Widget from '../../widget'
import io from "socket.io-client"
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';


export default class BrowserDistribution extends Component {

    static defaultProps = {
        title: 'Page Device Distribution'
    };

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let _this = this;
        fetch(this.props.configManageUrl)
            .then(data => data.json())
            .then((data) => {
                let socket = io(data["app_service_url"]);
                socket.on("browserDistribution", function (data) {
                    if (data) {
                        data["name"] = "Total PV";
                        _this.setState({data: [data]});
                    }
                })
            });
    }

    render() {
        const {error, loading, data} = this.state;
        const {title} = this.props;
        return (
            <Widget title={title} loading={loading} error={error}>
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
            </Widget>
        )
    }
}

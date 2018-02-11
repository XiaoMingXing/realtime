import {Component} from 'react'
import Widget from '../../widget'
import CircleProgress from '../../circle-progress'
import io from '../../socket'


export default class PagePV extends Component {

    static defaultProps = {
        title: 'Page Visit'
    };

    constructor(props) {
        super(props);
        this.state = {
            totalPV: 0
        };
    }

    componentDidMount() {
        let _this = this;
        io(function (socket) {
            socket.on("newDataComes", function (data) {
                _this.setState({totalPV: data});
            })
        })
    }

    handleData(data) {
        this.setState({totalPV: data.result});
    }

    render() {
        const {error, loading, totalPV} = this.state;
        const {title} = this.props;
        return (
            <Widget title={title} loading={loading} error={error}>
                <CircleProgress value={totalPV}/>
            </Widget>
        )
    }
}

import {Component} from 'react'
import Widget from '../../widget'


export default class StockPrice extends Component {

    static defaultProps = {
        title: 'Stock Price'
    };

    constructor(props) {
        super(props);
    }


    render() {
        const {title} = this.props;
        return (
            <Widget title={title}>
                <iframe
                    src="https://app.redash.io/thoughtworks-realtime/embed/query/69708/visualization/121119?api_key=r9np1giconNXU2OqygDviDhv0LtFaIHxwsKL0puO"/>
            </Widget>
        )
    }
}

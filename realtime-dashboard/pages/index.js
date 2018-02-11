import Dashboard from '../components/dashboard'
// Widgets
import PageVisit from '../components/widgets/useractivity'
import BrowserDistribution from '../components/widgets/useractivity/distribute'
import StockPrice from '../components/widgets/stockprice'
// Theme
import lightTheme from '../styles/light-theme'
// import darkTheme from '../styles/dark-theme'

let CONFIG_MANAGEMENT_URL = "http://35.187.244.144:9000/config/customer5";

export default () => (

    <Dashboard theme={lightTheme}>

        <PageVisit title='Total Page Visit' configManageUrl={CONFIG_MANAGEMENT_URL}/>

        <BrowserDistribution title='Browser Distribution' configManageUrl={CONFIG_MANAGEMENT_URL}/>

        {/*<PageSpeedInsightsStats url='https://github.com' title='Device Distribution'/>*/}

        <StockPrice title="Stock Price Dashboard"/>

    </Dashboard>
)


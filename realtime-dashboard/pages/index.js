import Dashboard from '../components/dashboard'
// Widgets
import PageVisit from '../components/widgets/useractivity'
import BrowserDistribution from '../components/widgets/useractivity/distribute'
// Theme
import lightTheme from '../styles/light-theme'
// import darkTheme from '../styles/dark-theme'

export default () => (
    <Dashboard theme={lightTheme}>

        <PageVisit title='Total Page Visit'/>

        <BrowserDistribution title='Browser Distribution'/>

        {/*<PageSpeedInsightsStats url='https://github.com' title='Device Distribution'/>*/}

    </Dashboard>
)


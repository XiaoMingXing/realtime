import Dashboard from '../components/dashboard'
// Widgets
import PageVisit from '../components/widgets/useractivity'
// Theme
import lightTheme from '../styles/light-theme'
import PageSpeedInsightsStats from "../components/widgets/pagespeed-insights/stats"
// import darkTheme from '../styles/dark-theme'

export default () => (
    <Dashboard theme={lightTheme}>

        <PageVisit title='Total Page Visit'/>

        <PageSpeedInsightsStats url='https://github.com' title='Device Distribution'/>

    </Dashboard>
)


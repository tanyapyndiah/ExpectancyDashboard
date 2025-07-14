import './MainPage.css'
import BarChartComp from './BarChartComp'
import CountryGraph from './CountryGraph'
import { useState } from 'react'

function MainPage() {
    const [french,setFrench] = useState(false)

    return (
        <>
        <div className="mainpage-cont">
                <div className="title-language-cont">
                    <div className="title">
                        {!french && <p className="title-text">Life Expectancy<br/>Insights</p>}
                        {french && <p className="title-text">Aperçus sur<br/>l’espérance de vie</p>}
                        {!french?<p className="description">This dashboard visualizes life expectancy across countries and regions worldwide. Users can compare trends, observe changes over time, and explore regional differences in health and development. The interactive charts provide clear insights into global progress and factors affecting longevity.</p>:<p className="description">Ce tableau de bord visualise l'espérance de vie à travers les pays et régions du monde. Les utilisateurs peuvent comparer les tendances, observer l'évolution au fil du temps, et explorer les différences régionales en matière de santé et de développement. Les graphiques interactifs offrent des insights clairs sur les progrès mondiaux et les facteurs influençant la longévité.</p>}
                    </div>
                    <div className="language-cont">
                        {!french && <p className="language">Language</p>}
                        {french && <p className="language">Langue</p>}
                        <button className={`english-btn lang-btn ${!french ? 'lang-selected' : ''}`} onClick={()=> setFrench(false)}>English</button>
                        <button className={`french-btn lang-btn ${french ? 'lang-selected' : ''}`} onClick={()=> setFrench(true)}>Français</button>
                    </div>
                </div>
                <div className="graph-cont" >
                    <CountryGraph french={french}></CountryGraph>
                    <BarChartComp french={french}></BarChartComp>
                </div>
        </div>
        </>
    )
}

export default MainPage
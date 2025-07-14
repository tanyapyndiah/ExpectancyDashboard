import { useState,useEffect } from 'react'
import './BarChartComp.css'
import {data} from '../data'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarChartComp({french}) {
    const [selectedYear, setSelectedYear] = useState("2023");
    const [filteredData, setFilteredData] = useState([]);
    const [frenchFilteredData, setFrenchFilteredData] = useState([]);

    const continentsData = data.filter(item => item.Entity == 'Americas' || item.Entity == 'Africa' || item.Entity == 'Europe' || item.Entity == 'Asia' || item.Entity == 'Australia')
    const maxYear = Math.max(...continentsData.map(item => item.Year));
    const minYear = Math.min(...continentsData.map(item => item.Year));

    const frenchContinentsData = continentsData.map(({ Expectancy, ...rest }) => ({
        Esperance: Expectancy,
        ...rest,
    }));

    frenchContinentsData.forEach(continent => {
        if (continent.Entity == 'Americas'){
            continent.Entity = 'Amériques'
        }
        if (continent.Entity == 'Africa'){
            continent.Entity = 'Afrique'
        }
        if (continent.Entity == 'Asia'){
            continent.Entity = 'Asie'
        }
        if (continent.Entity == 'Australia'){
            continent.Entity = 'Australie'
        }
    });

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    useEffect(() => {
        setFilteredData(continentsData.filter(item => item.Year == selectedYear ))
        setFrenchFilteredData(frenchContinentsData.filter(item => item.Year == selectedYear )) 
    },[selectedYear])

    return (
        <>
        <div className='bar-chart-cont'> 
            <div className="bar-chart-cont">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={500}
                    height={300}
                    data={!french? filteredData : frenchFilteredData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Entity" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#72A08B', color: '#313131' }} labelStyle={{ color: '#72A08B' }} itemStyle={{ color: '#2b5d4d' }}/>
                    <Legend />
                    <Bar dataKey={french ? 'Esperance' : 'Expectancy'} fill="#E0E0D2" activeBar={<Rectangle fill="#72A08B" stroke="green" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="year-option-cont">
                <div className="select-year-cont" style={{display: 'flex', flexDirection: 'column', width: '50%', height:'100%'}}>
                    {!french? <label htmlFor="year" className="select-year-text" style={{fontSize: '1.5rem', fontWeight: '400'}}>Select a year:</label>: <label htmlFor="year" className="select-year-text" style={{fontSize: '1.5rem', fontWeight: '400'}}>Choisissez une année:</label>}
                    <input id="year" type="number" max={maxYear} min={minYear} defaultValue={maxYear} onChange={handleYearChange}/>
                </div>
                {!french?<p className="bar-descr" style={{fontSize: '1.2rem', fontWeight: '300', width: '40%', textAlign: 'right'}}>Bar chart comparing life expectancy for continents</p>:<p className="bar-descr" style={{fontSize: '1.2rem', fontWeight: '300', width: '40%', textAlign: 'right'}}>Graphique à barres comparant l’espérance de vie entre les continents</p>}
            </div>

        </div>
        </>
    )
}

export default BarChartComp

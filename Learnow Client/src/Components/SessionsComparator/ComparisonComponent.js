import React, { useEffect, useState } from 'react'
import { improvmentCharts } from './ImprovmentCharts'
import { RadioChooseCharts } from './RadioChooseCharts'

export const ComparisonComponent = ({comparisonResult}) => {

    const [chart, setChart] = useState(null)
    const [displayChart, setDisplayChart] = useState(0)
    const [chartChoose, setChartChoose] = useState(null)

    useEffect(() => {
        setChart(improvmentCharts({comparisonResult}))
    },[])

    const onRadioChange = e => {
        setDisplayChart(e)
    }

    useEffect(() => {
        if (chart) {
            setChartChoose(RadioChooseCharts({chart, onRadioChange}))
        }
    },[chart])

    return (
        <div style={{display: 'flex', flexFlow:'column wrap', alignContent: 'center', alignItems:'center'}}>
            {chartChoose}
            {chart ? chart[displayChart] : chart}
        </div>
    )
}
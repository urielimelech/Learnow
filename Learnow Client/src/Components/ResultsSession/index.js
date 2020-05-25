import React, { useEffect, useState } from 'react'
import { ResultCharts } from './ResultCharts'
import { RadioChooseCharts } from '../RadioChooseCharts';
import { StyledResultComponent } from './ResultSessionStyle';
import { Correlation } from './Correlation';

export const Results = () => {

    const [charts, setCharts] = useState([])
    const [optionChart, setOptionChart] = useState([])
    const [displayChart, setDisplayChart] = useState(0)

    const onRadioChange = e => {
        setDisplayChart(e)
    }

    const getSessionCharts = sessionCharts => {
        setCharts(sessionCharts)
    }

    useEffect(() => {
        setOptionChart(RadioChooseCharts({chart: charts, onRadioChange, label: 'results'}))
    },[])

    useEffect(() => {
        if (charts.length > 0)
            setOptionChart(RadioChooseCharts({chart: charts, onRadioChange, label: 'results'}))
    },[charts])

    return (
        <StyledResultComponent>
            {charts.length > 0 ? optionChart ? optionChart : null : null}
            {charts.length > 0 ? charts[displayChart] : <ResultCharts getFullArr={getSessionCharts}/>}
            <Correlation/>
        </StyledResultComponent>
    )
}
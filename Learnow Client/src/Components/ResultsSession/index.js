import React, { useEffect, useState } from 'react'
import { ResultCharts } from './ResultCharts'
import { RadioChooseCharts } from '../RadioChooseCharts';
import { StyledResultComponent } from './ResultSessionStyle';
import { Correlation } from './Correlation';
import { Button } from '@material-ui/core';
import { navigate } from 'hookrouter';

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
            <Button onClick={() => navigate('/Home')}>
                Go Back Home
            </Button>
            <Button onClick={() => navigate('/Recommendations')}>
                Continue To Recommendations For Activity
            </Button>
        </StyledResultComponent>
    )
}
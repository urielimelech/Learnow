import React, { useEffect, useState } from 'react'
import { ResultCharts } from './ResultCharts'
import { RadioChooseCharts } from '../RadioChooseCharts';
import { StyledResultComponent } from './ResultSessionStyle'
import { Correlation } from './Correlation'
import { Button } from '@material-ui/core'
import { navigate } from 'hookrouter'
import { useSelector, useDispatch } from 'react-redux'
import { updateFitContent } from '../../Redux/Actions';

export const Results = () => {

    const [charts, setCharts] = useState([])
    const [optionChart, setOptionChart] = useState([])
    const [displayChart, setDisplayChart] = useState(0)

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const _dispatch = useDispatch()

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
        if (charts.length > 0){
            setOptionChart(RadioChooseCharts({chart: charts, onRadioChange, label: 'results'}))
            _dispatch(updateFitContent(true))
        }
    },[charts])

    return (
        <StyledResultComponent>
            {charts.length > 0 ? optionChart ? optionChart : null : null}
            {charts.length > 0 ? charts[displayChart] : <ResultCharts getFullArr={getSessionCharts}/>}
            <Correlation/>
            <Button onClick={() => navigate('/Home')}>
                Go Back Home
            </Button>
            {loggedUser.email === 'student' ? 
                <Button onClick={() => navigate('/Recommendations')}>
                    Continue To Recommendations For Activity
                </Button>
                :
                <Button onClick={() => navigate('/EducationalActivity')}>
                    Check Learning Activity
                </Button>
            }   
        </StyledResultComponent>
    )
}
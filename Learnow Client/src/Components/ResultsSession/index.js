import React, { useEffect, useState } from 'react'
import { ResultCharts } from './ResultCharts'
import { RadioChooseCharts } from '../RadioChooseCharts'
import { StyledResultComponent } from './ResultSessionStyle'
import { Correlation } from './Correlation'
import { navigate } from 'hookrouter'
import { useSelector, useDispatch } from 'react-redux'
import { updateFitContent } from '../../Redux/Actions'
import { ButtonType } from '../ButtonType/ButtonType'

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
            {charts.length > 0 ?
            <div>
                <ButtonType onClick={() => navigate('/Home')}>
                Go Back Home
                </ButtonType>
                {loggedUser.email === 'student' ? 
                    <ButtonType onClick={() => navigate('/Recommendations')}>
                        Continue To Recommendations For Activity
                    </ButtonType>
                    :
                    <ButtonType onClick={() => navigate('/EducationalActivity')}>
                        Check Learning Activity
                    </ButtonType>}
            </div>
            : 
            null }  
        </StyledResultComponent>
    )
}
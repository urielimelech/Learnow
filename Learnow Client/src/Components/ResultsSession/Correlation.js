import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CorrelationChart } from './CorrelationChart'

export const Correlation = () => {
    
    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)

    const [resultQuestionCharts, setResultQuestionCharts] = useState(null)

    useEffect(() => {
        if (Object.keys(lastSessionData).length !== 0) {
            setResultQuestionCharts(<CorrelationChart correlation={lastSessionData}/>)
        }
    },[])
    return resultQuestionCharts
}
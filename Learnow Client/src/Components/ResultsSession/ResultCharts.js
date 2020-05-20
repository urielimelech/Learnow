import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading'
import { ResultLineChart } from './ResultLineChart'

export const ResultCharts = ({getFullArr}) => {

    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)

    const [sessionData, setSessionData] = useState(null)
    const [videoSessionData, setVideoSessionData] = useState(null)
    const [quizSessionData, setQuizSessionData] = useState(null)
    const [resultCharts, setResultCharts] = useState([])

    const fromMiliToSec = startTimeStamp => {
        const milisecToSec = 1000
        return Math.round(startTimeStamp / milisecToSec)
    }

    const differenceInSec = (currentTimeStamp, startTimeStamp) => {
        return fromMiliToSec(currentTimeStamp) - fromMiliToSec(startTimeStamp)
    }

    const getArrayAsData = (dataArray, diff, shift = 0) => {
        const videoData = dataArray.map(e => {
            if (shift <= e[0] && e[0] <= diff + shift) 
                return e
            else if (e[0] === 'x')
                return undefined
        }).filter(item => {
            return item !== undefined
        })
        videoData.unshift(['x', 'attention', 'meditation'])
        return videoData
    }

    const getSessionSerie = lastSessionData => {
        const sessionData = lastSessionData.monitorData.map(e => {
            const timeStamp = differenceInSec(e.timeStamp, lastSessionData.startTimeStamp)
            return [timeStamp, e.attention, e.meditation]
        })
        sessionData.unshift(['x', 'attention', 'meditation'])
        return sessionData
    }

    const getVideoSessionSerie = (lastSessionData, sessionData) => {
        const diffStartEndVideo = differenceInSec(lastSessionData.startQuizStamp, lastSessionData.startTimeStamp)
        return getArrayAsData(sessionData, diffStartEndVideo)
    }

    const getQuizSessionSerie = (lastSessionData, sessionData) => {
        const shift = differenceInSec(lastSessionData.startQuizStamp, lastSessionData.startTimeStamp)
        const diffStartEndVideo = differenceInSec(lastSessionData.endTimeStamp, lastSessionData.startQuizStamp)
        return getArrayAsData(sessionData, diffStartEndVideo, shift)
    }

    useEffect(() => {
        if(Object.keys(lastSessionData).length !== 0){
            setSessionData(getSessionSerie(lastSessionData))
        }
    },[lastSessionData])

    useEffect(() => {
        if (sessionData !== null) {
            setVideoSessionData(getVideoSessionSerie(lastSessionData, sessionData))
            setQuizSessionData(getQuizSessionSerie(lastSessionData, sessionData))
            setResultCharts(prev => [...prev, <ResultLineChart data={sessionData} title={'Full'} key={0}/>])
        }
    },[sessionData])

    useEffect(() => {
        if (videoSessionData !== null) {
            setResultCharts(prev => [...prev, <ResultLineChart data={videoSessionData} title={'Video'} key={1}/>])
        }
    },[videoSessionData])

    useEffect(() => {
        if (quizSessionData !== null) {
            setResultCharts(prev => [...prev, <ResultLineChart data={quizSessionData} title={'Quiz'} key={2}/>])
        }
    },[quizSessionData])

    useEffect(() => {
        if (resultCharts.length === 3) {
            getFullArr(resultCharts)
        }
    },[resultCharts])

    return (
        resultCharts.length > 0 ? resultCharts : <Loading/>
    )
}
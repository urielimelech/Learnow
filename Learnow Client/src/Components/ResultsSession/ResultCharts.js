import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading'
import { ResultLineChart } from './ResultLineChart'
import { CorrelationChart } from './CorrelationChart'

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
        videoData.unshift(['x', 'attention', {role: 'tooltip'}, 'meditation', {role: 'tooltip'}])
        return videoData
    }

    const findMinMax = lastSessionData => {
        let minAtt = lastSessionData.lowestAttentionLevel[0]?.attention, maxAtt = lastSessionData.highestAttentionLevel[0]?.attention
        let minMed = lastSessionData.lowestMeditationLevel[0]?.meditation, maxMed = lastSessionData.highestMeditationLevel[0]?.meditation
        let i = 1
        while (i < lastSessionData.lowestAttentionLevel.length) {
            let tempLowAtt = lastSessionData.lowestAttentionLevel[i].attention
            minAtt = (tempLowAtt < minAtt) ? tempLowAtt : minAtt
            i++
        }
        i = 1
        while (i < lastSessionData.highestAttentionLevel.length) {
            let tempHighAtt = lastSessionData.highestAttentionLevel[i].attention
            maxAtt = (tempHighAtt > maxAtt) ? tempHighAtt : maxAtt
            i++
        }
        i = 1
        while (i < lastSessionData.lowestMeditationLevel.length) {
            let tempLowMed = lastSessionData.lowestMeditationLevel[i].meditation
            minMed = (tempLowMed < minMed) ? tempLowMed : minMed
            i++
        }
        i = 1
        while (i < lastSessionData.highestMeditationLevel.length) {
            let tempHighMed = lastSessionData.highestMeditationLevel[i].meditation
            maxMed = (tempHighMed > maxMed) ? tempHighMed : maxMed
            i++
        }
        return [minAtt, maxAtt, minMed, maxMed]
      }

    const getSessionSerie = lastSessionData => {
        if (lastSessionData.isBroken === true){
            const sessionData = lastSessionData.monitorData.map(e => {
                const timeStamp = differenceInSec(e.timeStamp, lastSessionData.startTimeStamp)
                return [timeStamp, e.attention, e.meditation]
            })
            sessionData.unshift(['x', 'attention', 'meditation'])
            return sessionData
        }
        else {
            const minMaxArr = findMinMax(lastSessionData)
            const sessionData = lastSessionData.monitorData.map(e => {
                const timeStamp = differenceInSec(e.timeStamp, lastSessionData.startTimeStamp)
                return [timeStamp,
                    e.attention, (e.attention === minMaxArr[0] ? `${e.attention} is Minimum Value` : (e.attention === minMaxArr[1] ? `${e.attention} is Maximum Value` : null)),
                    e.meditation, (e.meditation === minMaxArr[2] ? `${e.meditation} is Minimum Value` : (e.meditation === minMaxArr[3] ? `${e.meditation} is Maximum Value` : null)),
                ]
            })
            sessionData.unshift(['x', 'attention', {role: 'tooltip'}, 'meditation', {role: 'tooltip'}])
            return sessionData
        }
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
            if (!lastSessionData.isBroken) {
                setVideoSessionData(getVideoSessionSerie(lastSessionData, sessionData))
                setQuizSessionData(getQuizSessionSerie(lastSessionData, sessionData))
            }
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
            setResultCharts(prev => [...prev, <CorrelationChart correlation={lastSessionData} title={'Quiz Answers in'} key={3}/>])
        }
    },[quizSessionData])

    useEffect(() => {
        if (resultCharts.length === 4) {
            getFullArr(resultCharts)
        }
        else if (lastSessionData.isBroken && resultCharts.length > 0)
            getFullArr(resultCharts)
    },[resultCharts])

    return (
        <Loading/>
    )
}
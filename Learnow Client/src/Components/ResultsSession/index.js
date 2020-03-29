import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Chart } from 'react-charts'

import { socketToWebServer } from '../../SocketIoClient'
import { getLastSessionData } from '../../Redux/Actions'
// import useChartConfig from 'hooks/useChartConfig'

// import { Chart } from "react-google-charts";

export const Results = () => {

    const _dispatch = useDispatch()
    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)

    const [attentionData, setAttentionData] = useState(null)
    const [meditationData, setMeditationData] = useState(null)
    const [videoAttentionData, setVideoAttentionData] = useState(null)
    const [videoMeditationData, setVideoMeditationData] = useState(null)
    const [quizAttentionData, setQuizAttentionData] = useState(null)
    const [quizMeditationData, setQuizMeditationData] = useState(null)

    const [sessionDataResults, setSessionDataResults] = useState(null)
    const [sessionVideoDataResults, setSessionVideoDataResults] = useState(null)
    const [sessionQuizDataResults, setSessionQuizDataResults] = useState(null)

    const fromMiliToSec = startTimeStamp => {
        const milisecToSec = 1000
        return Math.round(startTimeStamp / milisecToSec)
    }

    const differenceInSec = (currentTimeStamp, startTimeStamp) => {
        return fromMiliToSec(currentTimeStamp) - fromMiliToSec(startTimeStamp)
    }

    const getArrayAsData = (dataArray, diff) => {
        return dataArray.map(e => {
            if (e.x < diff) {
                return {x: e.x, y: e.y}
            }
        }).filter(item => {
            return item !== undefined
        })
    }

    const getAttentionSerie = lastSessionData => {
        return lastSessionData.monitorData.map(e => {
            const timeStamp = differenceInSec(e.timeStamp, lastSessionData.startTimeStamp)
            return {x: timeStamp, y: e.attention }
        })
    }
    
    const getMeditationSerie = lastSessionData => {
        return lastSessionData.monitorData.map(e => {
            const timeStamp = differenceInSec(e.timeStamp, lastSessionData.startTimeStamp)
            return {x: timeStamp, y: e.meditation }
        })
    }

    const getVideoAttentionSerie = (lastSessionData, attentionData) => {
        const diffStartEndVideo = differenceInSec(lastSessionData.startQuizStamp, lastSessionData.startTimeStamp)
        return getArrayAsData(attentionData, diffStartEndVideo)
    }

    const getVideoMeditationSerie = (lastSessionData, meditationData) => {
        const diffStartEndVideo = differenceInSec(lastSessionData.startQuizStamp, lastSessionData.startTimeStamp)
        return getArrayAsData(meditationData, diffStartEndVideo)
    }

    useEffect(() => {
        if(Object.keys(lastSessionData).length !== 0){
            setAttentionData(getAttentionSerie(lastSessionData))
            setMeditationData(getMeditationSerie(lastSessionData))
        }
    },[lastSessionData])

    useEffect(() => {
        if (attentionData !== null)
            setVideoAttentionData(getVideoAttentionSerie(lastSessionData, attentionData))
    },[attentionData])

    useEffect(() => {
        if (meditationData !== null)
            setVideoMeditationData(getVideoMeditationSerie(lastSessionData, meditationData))
    },[meditationData])

    useEffect(() => {
        console.log({attentionData})
        if (attentionData !== null){
            const dataChart = [
                {label: 'attention', data: attentionData},
                {label: 'meditation', data: meditationData}
            ]
            setSessionDataResults(dataChart)
        }
    },[attentionData])

    useEffect(() => {
        if (videoAttentionData !== null){
            const dataChart = [
                {label: 'attention', data: videoAttentionData},
                {label: 'meditation', data: videoMeditationData}
            ]
            setSessionVideoDataResults(dataChart)
        }
    },[videoAttentionData])

    useEffect(() => {
        socketToWebServer.emit('get last ended session', )
        socketToWebServer.on('last ended session', sessionData => {
            console.log('last session data', sessionData)
            _dispatch(getLastSessionData(sessionData))
        })
    },[])

    // const data1 = useMemo(() => 
    // [{
    //     label: 'attention',
    //     data: attentionData
    // }])

    // console.log(data1)

    // const data = useMemo(() =>
    //     [{
    //         label: 'attention',
    //         data: attentionData(lastSessionData)
    //     }])

    // [
    //     {
    //       label: 'Series 1',
    //       data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
    //     },
    //     {
    //       label: 'Series 2',
    //       data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
    //     }
    //   ],
    //   [])

    const axes = useMemo(() => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ])

    return ( sessionVideoDataResults === null ? 
        <div> test result </div>
        :
        // <div> {JSON.stringify(lastSessionData)}</div>
        <div   style={{
            width: '600px',
            height: '300px'
          }}> Your Results in session <br/>
        <Chart data={sessionDataResults} axes={axes} tooltip />  your parmas in Video <Chart data={sessionVideoDataResults} axes={axes} tooltip /> </div>
        
        // <div>{lastSessionData}</div>
    )
}
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Chart } from 'react-google-charts';

import { socketToWebServer } from '../../SocketIoClient'
import { getLastSessionData } from '../../Redux/Actions'

export const Results = () => {

    const _dispatch = useDispatch()
    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)
    const ip = useSelector(state => state.MainReducer.ip)

    const [sessionData, setSessionData] = useState(null)
    const [videoSessionData, setVideoSessionData] = useState(null)
    const [quizSessionData, setQuizSessionData] = useState(null)

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
                return
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
        }
    },[sessionData])

    useEffect(() => {
        socketToWebServer.emit('get last ended session', ip)
        socketToWebServer.on('last ended session', sessionData => {
            console.log('last session data', sessionData)
            _dispatch(getLastSessionData(sessionData))
        })
    },[])

    const options = {
        hAxis: {
          title: 'Time',
        },
        vAxis: {
          title: 'Metrics',
        },
        series: {
          1: { curveType: 'function' },
        },
      }

    return ( 
        <div style={{ width: '100%' }}>
            Your Results in session <br/>
            <Chart data={sessionData} width={'100%'} height={'400px'} chartType="LineChart" loader={<div>Loading Chart</div>} 
            options={options} rootProps={{ 'data-testid': '2' }}/>
            Your Video Results in session <br/>
            <Chart data={videoSessionData} width={'100%'} height={'400px'} chartType="LineChart" loader={<div>Loading Chart</div>} 
            options={options} rootProps={{ 'data-testid': '2' }}/>
            Your Quiz Results in session <br/>
            <Chart data={quizSessionData} width={'100%'} height={'400px'} chartType="LineChart" loader={<div>Loading Chart</div>} 
            options={options} rootProps={{ 'data-testid': '2' }}/>
        </div>
    )
}
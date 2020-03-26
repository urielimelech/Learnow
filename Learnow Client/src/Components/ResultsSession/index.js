import React, { useEffect, useMemo, useState } from 'react'
import { socketToWebServer } from '../../SocketIoClient'
import { useDispatch, useSelector } from 'react-redux'
import { getLastSessionData } from '../../Redux/Actions'
// import useChartConfig from 'hooks/useChartConfig'
import { Chart } from 'react-charts'


export const Results = () => {

    const _dispatch = useDispatch()
    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)

    const [attentionData, setAttentionData] = useState(null)
    const [meditationData, setMeditationData] = useState(null)
    const [data, setData] = useState(null)

    const getAttentionSerie = lastSessionData => {
        return lastSessionData.monitorData.map(e => {
            const timeStamp = Math.round((e.timeStamp - lastSessionData.startTimeStamp) / 1000)
            var l = Date((e.timeStamp))
            console.log(new Date(e.timeStamp).toLocaleTimeString())
            console.log(timeStamp)
            return {x: timeStamp, y: e.attention }
        })
    }
    
    const getMeditationSerie = lastSessionData => {
        return lastSessionData.monitorData.map(e => {
            const timeStamp = Math.round((e.timeStamp - lastSessionData.startTimeStamp) / 1000)
            var l = Date((e.timeStamp))
            console.log(new Date(e.timeStamp).toLocaleTimeString())
            console.log(timeStamp)
            return {x: timeStamp, y: e.meditation }
        })
    }

    // setAttentionData(lastSessionData => {
    //     return lastSessionData.monitorData.map(e => {
    //         return {x: e.timeStamp, y: e.attention }
    //     })
    // })

    useEffect(() => {
        if(Object.keys(lastSessionData).length !== 0){
            setAttentionData(getAttentionSerie(lastSessionData))
            setMeditationData(getMeditationSerie(lastSessionData))
        }
    },[lastSessionData])


    useEffect(() => {
        console.log({attentionData})
        if (attentionData !== null){
            const dataChart = [
                {label: 'attention', data: attentionData},
                {label: 'meditation', data: meditationData}
            ]
            // const data1 = useMemo(() => 
            // [{
            //     label: 'attention',
            //     data: attentionData
            // }])
            setData(dataChart)
            console.log(data)
        }
    },[attentionData])

    // useEffect(()=>{
    //     if(!meditationData){
    //         const data2=
    //     }
    // })

    useEffect(() => {
        console.log(data)
    },[data])

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

    return ( data === null ? 
        <div> test result </div>
        :
        // <div> {JSON.stringify(lastSessionData)}</div>
        <div   style={{
            width: '600px',
            height: '300px'
          }}> Your Results in session <br/>
        <Chart data={data} axes={axes} tooltip /></div>
        // <div>{lastSessionData}</div>
    )
}
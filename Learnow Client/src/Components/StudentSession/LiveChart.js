import React, { useEffect, useState } from 'react'
import { socketToWebServer } from '../../SocketIoClient'
import Chart from 'react-google-charts'
import { Loading } from '../Loading'
import { StyledLiveChartContainer } from './StyledLiveChartContainer'

export const LiveChart = () => {

    const [sensorData, setSensorData] = useState([])
    const [liveData, setLiveData] = useState(null)

    const fromMiliToSec = startTimeStamp => {
        const milisecToSec = 1000
        return Math.round(startTimeStamp / milisecToSec)
    }

    const differenceInSec = (currentTimeStamp, startTimeStamp) => {
        return fromMiliToSec(currentTimeStamp) - fromMiliToSec(startTimeStamp)
    }

    useEffect(() => {
        socketToWebServer.on('data to client', data => {
            console.log(data)
            setSensorData(prev => [...prev, data])
        })
        return () => socketToWebServer.off('data to client')
    },[])

    useEffect(() => {
        console.log(sensorData)
        if (sensorData.length > 0) {
            const sessionData = sensorData.map(e => {
                const timeStamp = differenceInSec(e.timeStamp, sensorData[0].timeStamp)
                return [timeStamp, e.attention, e.meditation]
            })
            sessionData.unshift(['x', 'attention', 'meditation'])
            setLiveData(sessionData)
        }
    },[sensorData])

    const options = {
        hAxis: {
            title: 'Time',
        },
        vAxis: {
            title: 'Metrics',
            maxValue: 100,
            minValue: 0
        },
        series: {
            1: { curveType: 'function' }
        },
        title: `live Session`,
        // colors: ['#000080', '#28ca27'],
        colors: ['#000080', '#B22222'],
        tooltip: {
            textStyle: {
                fontSize: 15
            }
        }
    }
    return (liveData ? 
        <StyledLiveChartContainer>
            <Chart 
                style={{display: 'flex', justifyContent: 'center', alignSelf: 'center'}}
                data={liveData} 
                width={'90%'} 
                height={'25rem'}
                chartType="LineChart" 
                loader={<Loading/>} 
                options={options} 
                rootProps={{ 'data-testid': '2' }}
            />
        </StyledLiveChartContainer>
    : null
    )
}
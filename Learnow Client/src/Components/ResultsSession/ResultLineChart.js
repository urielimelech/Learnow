import React from 'react'
import Chart from 'react-google-charts'
import { Loading } from '../Loading'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../consts'

export const ResultLineChart = ({data, title}) => {
    const options = {
        hAxis: {
            title: 'Time',
        },
        vAxis: {
            title: 'Metrics',
        },
        series: {
            1: { curveType: 'function' }
        },
        title: `${title} Session Results`,
        colors: ['#0ce9ed', '#28fa07']
    }
    return (
        <Chart 
            data={data} 
            width={WINDOW_WIDTH} 
            height={WINDOW_HEIGHT*0.4}
            chartType="LineChart" 
            loader={<Loading/>} 
            options={options} 
            rootProps={{ 'data-testid': '2' }}
        />
    )
}
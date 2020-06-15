import React from 'react'
import Chart from 'react-google-charts'
import { Loading } from '../Loading'
import { StyledChartContainer } from './ResultSessionStyle'

export const ResultLineChart = ({data, title}) => {
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
        title: `${title} Session Results`,
        colors: ['#000080', '#28ca27'],
        tooltip: {
            textStyle: {
                fontSize: 20,
                bold: true
            }
        }
    }
    return (
        <StyledChartContainer>
            <Chart 
                style={{display: 'flex', justifyContent: 'center', alignSelf: 'center'}}
                data={data} 
                width={'90%'} 
                height={'25rem'}
                chartType="LineChart" 
                loader={<Loading/>} 
                options={options} 
                rootProps={{ 'data-testid': '2' }}
            />
        </StyledChartContainer>
    )
}
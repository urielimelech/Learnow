import React from 'react'
import { Loading } from '../Loading'
import Chart from 'react-google-charts'
import Rubik from '../TextType/fonts/Rubik-Regular.ttf'
import { StyledFeedbackChartContainer } from './FeedbackChartContainer'

export const FeedbackChart = improvment => {
    const sumImprovment = improvment.sumImprovment
    const weights = [1, 2, 3]
    const rawData = sumImprovment.map(elem => {
        const activity = elem.activity
        const sum = elem.low * weights[0] + elem.medium * weights[1] + elem.high * weights[2]
        return [activity, sum]
    })

    const data = [['Activity', 'Improvement Level'], ...rawData]

    return <StyledFeedbackChartContainer>
        <Chart
            width={'95%'}
            height={'30rem'}
            style={{display: 'flex', justifyContent: 'center', alignSelf: 'center'}}
            chartType="ColumnChart"
            loader={<Loading/>}
            data={data}
            options={{
                title: `Feedback Results`,
                titleTextStyle: {
                    fontSize: 20,
                    bold: true,
                    fontName: Rubik
                },
                bar: { 
                    groupWidth: '60%',
                },
                legend: {
                    position: 'right',
                },
                vAxis: {
                    title: 'Improvement Level',
                    minValue: 0,
                }
            }}
        />
    </StyledFeedbackChartContainer>
}
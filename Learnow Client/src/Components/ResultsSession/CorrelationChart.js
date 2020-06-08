import React from 'react'
import { blue } from '@material-ui/core/colors'
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../consts'
import Chart from 'react-google-charts'
import { Loading } from '../Loading'

export const CorrelationChart = ({correlation}) => {

    const chartsTabs = correlation.answersQuiz ? correlation.answersQuiz.map((elem, index) => {
        if (correlation.correlation.videoCorrelation[index] === undefined)
            correlation.correlation.videoCorrelation[index] = {
                avarageAttention: 0,
                avarageMeditation: 0
        }
        const videoAttAvg = correlation.correlation.videoCorrelation[index].avarageAttention
        const quizAttAvg = correlation.correlation.quizCorrelation[index].avarageAttention
        const rowData = [`Question ${index + 1}`, 100, elem ? 'Correct' : 'Wrong', elem ? 'Correct Answer' : 'Wrong Answer', videoAttAvg, quizAttAvg]
        return rowData
    }) : null
    const data = [['Question Number', 'Answer', {role: 'annotation'}, {role: 'annotationText'}, 'Video Attention Avarage', 'Quiz Attention Avarage'], ...chartsTabs]
    return (
        <Chart
            width={'90%'}
            height={'18rem'}
            chartType="ColumnChart"
            loader={<Loading/>}
            data={data}
            options={{
                title: `Quiz Results`,
                titleTextStyle: {
                    fontSize: 20,
                    bold: true
                },
                bar: { 
                    groupWidth: '60%',
                },
                legend: {
                    position: 'right'
                },
                vAxis: {
                    title: 'Metrics',
                    maxValue: 100,
                    minValue: 0,
                },
                // colors: [blue.A200, '#0ce9ed', '#28fa07']
                colors: [blue.A200, '#000080', '#28ca27']
            }}
        />
    )
}
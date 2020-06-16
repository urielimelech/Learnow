import React from 'react'
import { Chart } from 'react-google-charts'
import { green, blue, yellow, red } from '@material-ui/core/colors'
import { Loading } from '../Loading'

export const improvmentCharts = ({comparisonResult}) => {
    
    const charts = comparisonResult.map((elem, index) => {
        const labels = Object.keys(elem.comparisonData).map(elem => {
            return elem.split('_').join(' ')
        })
        const chartTabs = Object.values(elem.comparisonData).map((elem, index) => {
            switch (elem) {
                case false:
                    return [labels[index], -1, 'No Improve', red.A200]
                case 'low':
                    return [labels[index], 1, 'Low', yellow.A200]
                case 'medium':
                    return [labels[index], 2, 'Medium', blue.A200]
                case 'high': 
                    return [labels[index], 3, 'High', green.A200]
                default:
                    break
            }
        })
        const data = [['', 'Improvment', {role: 'annotation'}, { role: 'style' }], ...chartTabs]
        return (
            <Chart
                key={index}
                improve={[elem.activity[0], elem.activity[1]]}
                width={'90%'}
                height={'30rem'}
                chartType="ColumnChart"
                loader={<Loading/>}
                data={data}
                options={{
                    title: `Improvement of Measurments between ${elem.activity[0]} activity and ${elem.activity[1]} activity`,
                    titleTextStyle: {
                        fontSize: 20,
                        bold: true
                    },
                    bar: { 
                        groupWidth: '30%',
                    },
                    legend: {
                        position: 'none'
                    },
                    vAxis: {
                        maxValue: 3,
                        minValue: -1,
                    },
                }}
            />
        )
    })
    return charts
}
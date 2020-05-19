import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts';
import { green, blue, yellow, red } from '@material-ui/core/colors';


export const ComparisonComponent = ({comparisonResult}) => {

    const [chart, setChart] = useState(null)

    useEffect(() => {
        setChart (comparisonResult.map((elem, index) => {
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
            const data = [['', '', {role: 'annotation'}, { role: 'style' }], ...chartTabs]
            console.log(data)
            console.log(labels)
            return (
                <Chart
                    key={index}
                    width={'600px'}
                    height={'400px'}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        title: `Improvement of Measurments between ${elem.activity[0]} activity and ${elem.activity[1]} activity`,
                        titleTextStyle: {
                            fontSize: 20,
                            italic: true
                        },
                        bar: { 
                            groupWidth: '50%',
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
        }))
    },[])

    return (
        <div style={{display: 'flex', margin: '0 auto'}}>
            {chart}
        </div>
    )
}
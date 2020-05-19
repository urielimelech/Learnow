import React, { useEffect, useState } from 'react'
import { improvmentCharts } from './ImprovmentCharts'
import { RadioChooseCharts } from './RadioChooseCharts'
import { StyledComparisonComponent } from './ComparisonComponentStyle'
import { useSelector } from 'react-redux'

export const ComparisonComponent = ({comparisonResult}) => {

    const [chart, setChart] = useState(null)
    const [displayChart, setDisplayChart] = useState(0)
    const [chartChoose, setChartChoose] = useState(null)

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    useEffect(() => {
        setChart(improvmentCharts({comparisonResult}))
    },[])

    const onRadioChange = e => {
        setDisplayChart(e)
    }

    useEffect(() => {
        if (chart) {
            setChartChoose(RadioChooseCharts({chart, onRadioChange}))
        }
    },[chart])

    return (
        <StyledComparisonComponent>
            {loggedUser.userType === 'researcher' ? chartChoose : null}
            {chart ? chart[displayChart] : chart}
        </StyledComparisonComponent>
    )
}
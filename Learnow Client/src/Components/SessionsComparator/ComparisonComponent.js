import React, { useEffect, useState } from 'react'
import { improvmentCharts } from './ImprovmentCharts'
import { RadioChooseCharts } from '../RadioChooseCharts'
import { StyledComparisonComponent } from './ComparisonComponentStyle'
import { useSelector } from 'react-redux'
import { ButtonType } from '../ButtonType/ButtonType'
import { navigate } from 'hookrouter'

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
            setChartChoose(RadioChooseCharts({chart, onRadioChange, label: 'comparison'}))
        }
    },[chart])

    return (
        <StyledComparisonComponent>
            {loggedUser.userType === 'researcher' ? chartChoose : null}
            {chart ? chart[displayChart] : chart}
            <ButtonType onClick={()=> navigate('/Recommendations')}>CHECK MOST EFFECTIVE FEEDBACK</ButtonType>
        </StyledComparisonComponent>
    )
}
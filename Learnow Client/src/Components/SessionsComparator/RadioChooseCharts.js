import React from 'react'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

export const RadioChooseCharts = ({chart, onRadioChange}) => {

    const chartsChooseButtons = chart.map((elem, index) => {
        return <FormControlLabel 
            key={index}
            value={elem.key}
            control={<Radio color='primary'/>}
            label={`${elem.props.improve[0]} activity and ${elem.props.improve[1]} activity comparison`}
            labelPlacement='bottom'
        />
    })

    const handleRadioChange = event => {
        onRadioChange(event.target.value)
    }

    return (
        <FormControl component='fieldset'>
            <FormLabel component='legend'>Choose chart to display</FormLabel>
            <RadioGroup row aria-label='position' name='position' defaultValue={0} onChange={handleRadioChange}>
                {chartsChooseButtons}
            </RadioGroup>
        </FormControl>
    )
}
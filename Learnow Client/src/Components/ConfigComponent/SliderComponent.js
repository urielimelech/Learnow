import React, { useState, useEffect } from 'react'
import {Grid, Slider, Input} from '@material-ui/core'
import { WrapperSliderComponent, sliderComponentStyle } from './SliderComponentStyle'


export const SliderComponent = ({startValue, step, min, max, sliderKey, changeCommitted}) => {

    const marks = [
        {
            value: min,
            label: min
        },
        {
            value: max,
            label: max
        },
    ]

    const [value, setValue] = useState(startValue)

    useEffect(() => {
        changeCommitted(value, sliderKey)
    },[value])
  
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value))
    }
    
    const handleBlur = () => {
        if (value < min) {
            setValue(min)
        } else if (value > max) {
            setValue(max)
        }
    }

    const onCommit = (event, value) => {
        changeCommitted(value, sliderKey)
    }

    return (
        <WrapperSliderComponent container spacing={2}>
            <Grid item xs>
                <Slider style={sliderComponentStyle.SliderComp}
                    value = {value}
                    onChange = {handleChange}
                    valueLabelDisplay = "auto"
                    step={step}
                    min={min}
                    max={max}
                    marks={marks}
                    onChangeCommitted={onCommit}
                />
            </Grid>
            <Grid item style={sliderComponentStyle.GridInput}>
                <Input
                    value={value}
                    margin="dense"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                    step: 10,
                    min: min,
                    max: max,
                    style: sliderComponentStyle.Input,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                />
            </Grid>
        </WrapperSliderComponent>
    )
}
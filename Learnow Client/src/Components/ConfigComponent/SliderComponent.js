import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import Input from '@material-ui/core/Input'

export const SliderComponent = ({startValue, step, min, max, inputClasses, sliderKey, changeCommitted}) => {

    const marks = [
        {
            value: min,
            label: min,
        },
        {
            value: max,
            label: max,
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
        <Grid container spacing={2}>
            <Grid item xs>
                <Slider 
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
            <Grid item>
                <Input
                    className={inputClasses}
                    value={value}
                    margin="dense"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                    step: 10,
                    min: min,
                    max: max,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                />
            </Grid>
        </Grid>
    )
}
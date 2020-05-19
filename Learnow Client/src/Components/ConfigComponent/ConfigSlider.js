import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Button } from 'react-bootstrap'
import { navigate } from 'hookrouter'

import { SliderComponent } from './SliderComponent'
import { socketToWebServer } from '../../SocketIoClient'
import { ConfigSliderWrapper, TextConfig, WrapperConfig, ButtonConfig } from './ConfigSliderStyle'

export const ConfigSlider = ({userEmail, configObject, configKeys, configValues}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: 300
        },
        margin: {
            height: theme.spacing(3)
        }
    }))

    const classes = useStyles();

    const [renderSliders, setRenderSliders] = useState(null)
    const [config, setConfig] = useState(null)

    const sliders = () => {
        return configKeys.map((key, index) => {
            let params = {steps: 1, min: 0, max: 100}
            switch (key) {
                case 'correlator_range_of_seconds': {
                    params = {steps: 1, min: 1, max: 30}
                    break
                }
                case 'active_session_avarage_after_seconds': {
                    params = {steps: 5, min: 5, max: 100}
                    break
                }
                case 'comparator_high_improve': {
                    params = {steps: 1, min: 31, max: 45}
                    break
                }
                case 'comparator_medium_improve': {
                    params = {steps: 1, min: 16, max: 30}
                    break
                }
                case 'comparator_low_improve': {
                    params = {steps: 1, min: 0, max: 15}
                }
            }
            return (
                <ConfigSliderWrapper key={key}>
                    <TextConfig  gutterBottom>
                        {key.split('_').join(' ')}
                    </TextConfig>
                    <SliderComponent
                        startValue={configValues[index]}
                        step={params.steps}
                        min={params.min}
                        max={params.max}
                        inputClasses={classes.input}
                        sliderKey={key}
                        changeCommitted={changeCommittedInSlider}
                    />
                </ConfigSliderWrapper>
            )
        })
    }

    useEffect(() => {
        setConfig(configObject)
    },[])

    useEffect(() => {
        if (config) {
            setRenderSliders(sliders)
        }
    },[config])

    const changeCommittedInSlider = (value, key) => {
        const tempConf = config
        tempConf[key] = value
        setConfig(tempConf)
    }

    const saveConfiguration = () => {
        console.log({config: config, userEmail: userEmail})
        socketToWebServer.emit('save configuration', ({config: config, userEmail: userEmail}))
        navigate('/Home')
    }

    return (
        <WrapperConfig className={classes.root}>
            {renderSliders}
            <ButtonConfig onClick={saveConfiguration}>Save</ButtonConfig>
        </WrapperConfig>
    )
}
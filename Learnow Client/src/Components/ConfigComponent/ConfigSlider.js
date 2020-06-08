import React, { useState, useEffect } from 'react'
import { navigate } from 'hookrouter'

import { SliderComponent } from './SliderComponent'
import { socketToWebServer } from '../../SocketIoClient'
import { ConfigSliderWrapper, TextConfig, WrapperConfig, ButtonConfig } from './ConfigSliderStyle'
import { useDispatch } from 'react-redux'
import { updateFitContent } from '../../Redux/Actions'

export const ConfigSlider = ({studentData, configObject, configKeys, configValues}) => {

    const [renderSliders, setRenderSliders] = useState(null)
    const [config, setConfig] = useState(null)

    const _dispatch = useDispatch()

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
            _dispatch(updateFitContent(true))
        }
    },[config])

    const changeCommittedInSlider = (value, key) => {
        const tempConf = config
        tempConf[key] = value
        setConfig(tempConf)
    }

    const saveConfiguration = () => {
        socketToWebServer.emit('save configuration', ({userData: studentData.configResult}))
        navigate('/Home')
    }

    return (
        <WrapperConfig>
            {renderSliders}
            <ButtonConfig onClick={saveConfiguration}>Save</ButtonConfig>
        </WrapperConfig>
    )
}
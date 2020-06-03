import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ConfigSlider } from './ConfigSlider'
import { Loading } from '../Loading'

export const ConfigComponent = () => {

    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)

    const [configuration, setConfiguration] = useState(null)
    const [configKeys, setConfigKeys] = useState([])
    const [configValues, setConfigValues] = useState([])

    useEffect(() => {
        if (studentForResearch)
            setConfiguration(studentForResearch.configResult.config)
    },[])

    useEffect(() => {
        if (configuration) {
            if (configKeys.length === 0) {
                Object.keys(configuration).map(key => {
                    setConfigKeys(prev => [...prev, key])
                })
            }
            if (configValues.length === 0) {
                Object.values(configuration).map(value => {
                    setConfigValues(prev => [...prev, value])
                })
            }
        }
    },[configuration])

    return (
        configKeys.length !== 0 && configValues.length !== 0 ?
            <ConfigSlider studentData={studentForResearch} configObject={configuration} configKeys={configKeys} configValues={configValues}/>
        :
            <Loading/>
    )
}
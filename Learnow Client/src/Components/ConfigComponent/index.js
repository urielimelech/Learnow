import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { ConfigSlider } from './ConfigSlider'

export const ConfigComponent = () => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const [configuration, setConfiguration] = useState(null)
    const [configKeys, setConfigKeys] = useState([])
    const [configValues, setConfigValues] = useState([])

    useEffect(() => {
        socketToWebServer.emit('get user configuration', loggedUser.email)
        socketToWebServer.on('configuration', config => {
            setConfiguration(config)
        })

        return () => {
            socketToWebServer.off('configuration')
        }
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
            <ConfigSlider userEmail={loggedUser.email} configObject={configuration} configKeys={configKeys} configValues={configValues}/>
        :
            'loading'
    )
}
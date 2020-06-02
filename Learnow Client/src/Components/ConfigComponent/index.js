import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { ConfigSlider } from './ConfigSlider'
import { Loading } from '../Loading'
import { navigate } from 'hookrouter'

export const ConfigComponent = () => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)

    const [configuration, setConfiguration] = useState(null)
    const [configKeys, setConfigKeys] = useState([])
    const [configValues, setConfigValues] = useState([])

    useEffect(() => {
        socketToWebServer.emit('get user configuration', studentForResearch.email)
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

    const navToHome = () => {
        navigate('/Home')
        return null
    }

    return (
        loggedUser.userType === 'researcher' ? 
        configKeys.length !== 0 && configValues.length !== 0 ?
            <ConfigSlider userEmail={studentForResearch.email} configObject={configuration} configKeys={configKeys} configValues={configValues}/>
        :
            <Loading/>
        :    
        navToHome()
    )
}
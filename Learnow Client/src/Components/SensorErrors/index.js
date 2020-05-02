import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux' 
import { socketToWebServer } from '../../SocketIoClient'
import { notificationVisible } from '../../Redux/Actions'
import { ToastNotification } from '../Toastify'

export const SensorErrors = () => {

    const [errorNeuro, setErrorNeuro] = useState(null)

    const _dispatch = useDispatch()

    const errorMsg = msg => {
        _dispatch(notificationVisible(true))
        setErrorNeuro(<ToastNotification renderComponent={msg}/>)
    }

    const checkSensorError = errorNumber => {
        switch (errorNumber) {
            case 1: {
                errorMsg('Please, check sensor contacts.')
                break
            }
            case 2: {
                errorMsg('Sensor is not connect properly. Please make sure that the earclip is connected.')
                break
            }
        }
    }

    useEffect(() => {
        socketToWebServer.on('check sensor', errorNumber => {
            checkSensorError(errorNumber)
        }) 
        /** close all the listeners of check sensor */
        return () => socketToWebServer.off('check sensor')
    },[])

    /** delete error msg when error time ended */
    useEffect(() => {
        if (errorNeuro) {
            setTimeout(() => {
                setErrorNeuro(null)
            },6000)
        }
    },[errorNeuro])

    return errorNeuro
}
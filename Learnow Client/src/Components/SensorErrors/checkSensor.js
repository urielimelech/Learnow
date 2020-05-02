import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TextMessageToastify } from '../TextMessageToastify'
import { socketToWebServer } from '../../SocketIoClient'

export const CheckSensor = () => {

    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)

    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)

    useEffect(()=>{
        checkSensor()
        return () => socketToWebServer.off('check sensor')
    },[])

    /** delete error msg when error time ended */
    useEffect(() => {
        if (!isNotificationVisible) {
            setError(null)
            setMsg(null)
        }
    },[isNotificationVisible])

    /** if there is a msg, create a pop-up */
    useEffect(() => {
        if(msg)
            setError(<TextMessageToastify msg={msg}/>)
    },[msg])
    
    const checkSensor = () => socketToWebServer.on('check sensor', errorNumber => {
        checkSensorError(errorNumber)
    })

    const checkSensorError = errorNumber => {
        switch (errorNumber) {
            case 1: {
                setMsg('Please, check sensor contacts.')
                break
            }
            case 2: {
                setMsg('Sensor is not connect properly. Please make sure that the earclip is connected.')
                break
            }
        }
    }

    return error
}
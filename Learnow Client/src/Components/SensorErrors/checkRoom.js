import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { socketToWebServer } from "../../SocketIoClient"
import { isConnectedToRoom, isVideoEnded } from "../../Redux/Actions"
import { TextMessageToastify } from "../TextMessageToastify"

export const CheckRoom = () => {

    const _dispatch = useDispatch()

    const [msg, setMsg] = useState(null)
    const [error, setError] = useState(null)

    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)
    const connectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)

    const closeRoom = msg => {
        console.log('Closed Room')
        _dispatch(isConnectedToRoom(false))
        _dispatch(isVideoEnded(false))
        setMsg(msg)
    }

    const enteredRoom = () => socketToWebServer.on('sensor ready', () => {
        console.log('Entered Room')
        _dispatch(isConnectedToRoom(true))
    })

    const closedRoom = () => socketToWebServer.on('room closed', status => {
        closeRoom('wait for neurosky headset to connect or check if the headset is turned on')
    })

    const sensorDisconnected = () => socketToWebServer.on('sensor disconnected', () => {
        closeRoom('neurosky headset has disconnected')
    })

    useEffect(() => {
        closedRoom()
        enteredRoom()
        sensorDisconnected()
        return () => {
            socketToWebServer.off('sensor ready')
            socketToWebServer.off('room closed')
            socketToWebServer.off('sensor disconnected')
        }
    },[])

    useEffect(() => {
        if (msg)
            setError(<TextMessageToastify msg={msg}/>)
    },[msg])

    /** delete error msg when error time ended */
    useEffect(() => {
        if (!isNotificationVisible) {
            setError(null)
            setMsg(null)
        }
    },[isNotificationVisible])

    /** if room does not exist call to a toastify pop-up */
    useEffect(() => {
        let timeout
        if (!connectedToRoom) {
            timeout = setInterval(() => {
                _dispatch(isVideoEnded(false))
                setError(<TextMessageToastify msg={'wait for neurosky headset to connect or check if the headset is turned on'}/>)
            }, 5000)
        }
        return () => clearInterval(timeout)
    },[connectedToRoom])

    return error
}
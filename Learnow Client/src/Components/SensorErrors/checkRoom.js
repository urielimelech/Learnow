import { socketToWebServer } from "../../SocketIoClient"
import { isConnectedToRoom, isVideoEnded } from "../../Redux/Actions"
import { useDispatch, useSelector } from "react-redux"
import { TextMessageToastify } from "../TextMessageToastify"
import React, { useState, useEffect } from "react"

export const CheckRoom = () => {

    const _dispatch = useDispatch()

    const [msg, setMsg] = useState(null)
    const [error, setError] = useState(null)

    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)
    const connectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)

    const enteredRoom = () => socketToWebServer.on('enter room', status => {
        console.log('Entered Room')
        _dispatch(isConnectedToRoom(status))
    })

    const closedRoom = () => socketToWebServer.on('room closed', status => {
        console.log('Closed Room')
        _dispatch(isConnectedToRoom(status))
        _dispatch(isVideoEnded(false))
        setMsg('wait for neurosky headset to connect or check if the headset is turned on')
    })

    useEffect(() => {
        closedRoom()
        enteredRoom()
        return () => {
            socketToWebServer.off('enter room')
            socketToWebServer.off('room closed')
        }
    },[])

    useEffect(() => {
        if (msg)
            setError(<TextMessageToastify msg={msg}/>)
    },[msg])

    /** delete error msg when error time ended */
    useEffect(() => {
        console.log(isNotificationVisible)
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
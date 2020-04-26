import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { socketToWebServer } from '../../SocketIoClient'
import { ToastNotification } from '../Toastify'
import { setIp, isConnectedToRoom, notificationVisible, isVideoEnded } from '../../Redux/Actions'

export const ConnectionToRoom = () => {

    const [checkRoomConnection, setCheckRoomConnection] = useState(null)
    const [errorNeuro, setErrorNeuro] = useState(null)
  
    const ip = useSelector(state => state.MainReducer.ip)
    const connectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)
    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)
  
    const _dispatch = useDispatch()
  
    const enteredRoom = () => socketToWebServer.on('enter room', status => {
        console.log('Entered Room')
        _dispatch(isConnectedToRoom(status))
    })

    const closedRoom = () => socketToWebServer.on('room closed', status => {
        console.log('Closed Room')
        _dispatch(isConnectedToRoom(status))
        _dispatch(notificationVisible(true))
        _dispatch(isVideoEnded(false))
        setErrorNeuro(<ToastNotification renderComponent={'wait for neurosky headset to connect or check if the headset is turned on'}/>)
    })

    const dismissSocketListener = () => {
        socketToWebServer.off('enter room')
        socketToWebServer.off('room closed')
        _dispatch(isConnectedToRoom(false))
        _dispatch(notificationVisible(true))
        _dispatch(isVideoEnded(false))
    }

    const checkConnection = ip => setInterval(() => {
        socketToWebServer.emit('ip', ip)
    }, 5000)
  
    useEffect(() => {
        // getComputerIp()
        _dispatch(setIp('79.182.104.95'))
        enteredRoom()
        closedRoom()
        return () => dismissSocketListener()
    },[])

    useEffect(() => {
        if (connectedToRoom){
            clearInterval(checkRoomConnection)
        }
        else if (!connectedToRoom && ip.length !== 0){
            setCheckRoomConnection(checkConnection(ip))
        }
    },[connectedToRoom, ip])
    
    useEffect(() => {
        if (!isNotificationVisible)
            setErrorNeuro(null)
    },[isNotificationVisible])
    
    const getComputerIp = async () => {
        try {
            const result = await axios.get (
                'https://cors-anywhere.herokuapp.com/http://api.ipify.org:80'
            )
            _dispatch(setIp(result.data))
        }
        catch (e){
            console.log('catch', 'error gettin IP address')
        }
    }
    
    return errorNeuro
}
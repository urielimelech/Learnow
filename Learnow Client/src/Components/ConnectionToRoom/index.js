import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { socketToWebServer } from '../../SocketIoClient'
import { setIp } from '../../Redux/Actions'

export const ConnectionToRoom = () => {

    const ip = useSelector(state => state.MainReducer.ip)
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const connectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)
  
    const _dispatch = useDispatch()
  
    /** try to connect to a room */
    const onNewTGC = () => socketToWebServer.on('new TGC', () => {
        socketToWebServer.emit('ip', ({ip: ip, email: loggedUser.email}))
    })

    useEffect(() => {
        getComputerIp()
        // _dispatch(setIp('176.231.3.171'))
        return () => socketToWebServer.off('new TGC')
    },[])

    useEffect(() => {
        if (!connectedToRoom && ip.length !== 0){
            socketToWebServer.emit('ip', ({ip: ip, email: loggedUser.email}))
            onNewTGC()
        }
    },[connectedToRoom, ip])
    
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
    return null
}
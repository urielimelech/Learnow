import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { socketToWebServer } from '../../SocketIoClient'
import { setIp, isConnectedToRoom } from '../../Redux/Actions'

export const ConnectionToRoom = () => {

    const ip = useSelector(state => state.MainReducer.ip)
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const connectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)

    const _dispatch = useDispatch()
  
    useEffect(() => {
        getComputerIp()
        return () => {
            socketToWebServer.off('new TGC')
            socketToWebServer.emit('kill TGC', )
            _dispatch(isConnectedToRoom(false))
        }
    },[])

    useEffect(() => {
        if (!connectedToRoom && ip.length !== 0) {
            socketToWebServer.emit('ip', ({ip: ip, email: loggedUser.email}))
        }
    },[connectedToRoom, ip])
    
    const getComputerIp = async () => {
        axios.get('http://localhost:5000/getIP')
        .then (res => {
            _dispatch(setIp(res.data.ip))
        })
        .catch(e => console.log('catch', e, 'error gettin IP address'))
    }
    return null
}
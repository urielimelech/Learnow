import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { navigate } from 'hookrouter'

import { socketToWebServer } from '../../SocketIoClient'
import { isVerify } from '../../Redux/Actions'

export const VerifyTokenJwt = ({children}) => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const verified = useSelector(state => state.MainReducer.isVerify)
    const _dispatch = useDispatch()
    const check15Min = 1000 * 60 * 15 

    const checkTokenWithServer = () => {
        socketToWebServer.emit('validate token', loggedUser.token)
        socketToWebServer.on('get dbToken', ({success}) => {
            if (success)
                _dispatch(isVerify(true))
            else 
                _dispatch(isVerify(false))
        })
    }

    useEffect(() => {
        checkTokenWithServer()
        return
    },[])

    useEffect(() => {
        if (verified === false){
            navigate('/')
            /** add a message to user that the token is not valid anymore and need to reconnect */
            return 
        }
        else if (verified === true)
        /** check token with server every 5 minutes */
            setInterval(() => {
                checkTokenWithServer()
            }, check15Min)
    }, [verified])
    
    // return verified === null ? LoadingComponent : children
    return verified && children
}
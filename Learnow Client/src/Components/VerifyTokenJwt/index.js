import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { navigate } from 'hookrouter'

import { socketToWebServer } from '../../SocketIoClient'
import { isVerify, login, logout } from '../../Redux/Actions'
import { useCookies } from 'react-cookie'

export const VerifyTokenJwt = ({children}) => {

    const verified = useSelector(state => state.MainReducer.isVerify)
    const _dispatch = useDispatch()
    const check15Min = 1000 * 60 * 15

    const [cookies, setCookie, removeCookie] = useCookies(['email', 'token', 'name', 'userType', 'route'])

    const checkCookies = () => {
        if (cookies['email'] && cookies['token'] && cookies['name'] && cookies['userType']){
            const email = cookies['email']
            const token = cookies['token']
            const name = cookies['name']
            const userType = cookies['userType']
            socketToWebServer.emit('validate token', token)
            _dispatch(login({email: email, name: name, userType: userType, token: token}))
        }
        else {
            _dispatch(isVerify(false))
        }
    }

    const checkTokenWithServer = () => {
        socketToWebServer.on('get dbToken', ({success}) => {
            if (success)
                _dispatch(isVerify(true))
            else 
                _dispatch(isVerify(false))
        })
    }

    useEffect(() => {
        checkCookies()
        checkTokenWithServer()
        return () => socketToWebServer.off('get dbToken')
    },[])

    useEffect(() => {
        if (verified === false){
            _dispatch(logout())
            Object.keys(cookies).forEach(cookie => {
                removeCookie(cookie)
            })
            navigate('/')
            /** the token of the user is not valid anymore and need to reconnect */
        }
        else if (verified) {
            navigate(cookies['route'])
            /** check token with server every 5 minutes */
            setInterval(() => {
                checkTokenWithServer()
            }, check15Min)
        }
    }, [verified])
    
    // return verified === null ? LoadingComponent : children
    return verified && children
}
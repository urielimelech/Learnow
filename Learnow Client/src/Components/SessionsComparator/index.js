import React, { useEffect, useState } from 'react'
import { useSelector }from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { SessionList } from './SessionList'

export const SessionsComparator = () => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const [comparisonResult, setComparisonResult] = useState(null)
    const [sessionsList, setSessionsList] = useState([])

    useEffect(() => {
        socketToWebServer.emit('get all user sessions', loggedUser.email)
        socketToWebServer.on('all user sessions', userSessions => {
            setSessionsList(<SessionList userSessions={userSessions} email={loggedUser.email}/>)
        })
        socketToWebServer.on('compared sessions', result => {
            setComparisonResult(result)
        })
        return () => {
            socketToWebServer.off('all user sessions')
            socketToWebServer.off('compared sessions')
        }
    },[]) 

    useEffect(() => {
        if (comparisonResult !== null){
            console.log(comparisonResult)
        }
    },[comparisonResult])

    return sessionsList
}
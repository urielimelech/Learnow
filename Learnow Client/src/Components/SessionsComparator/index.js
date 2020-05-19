import React, { useEffect, useState } from 'react'
import { useSelector }from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { SessionList } from './SessionList'
import { ComparisonComponent } from './ComparisonComponent'

export const SessionsComparator = () => {

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const [comparisonResult, setComparisonResult] = useState([])
    const [sessionsList, setSessionsList] = useState([])
    const [comparisonComponent, setComparisonComponent] = useState(null)

    useEffect(() => {
        socketToWebServer.emit('get all user sessions', loggedUser.email)
        socketToWebServer.on('all user sessions', userSessions => {
            setSessionsList(<SessionList userSessions={userSessions} email={loggedUser.email}/>)
        })
        socketToWebServer.on('compared sessions', result => {
            setComparisonResult(prev => [result, ...prev])
        })
        return () => {
            socketToWebServer.off('all user sessions')
            socketToWebServer.off('compared sessions')
        }
    },[]) 

    useEffect(() => {
        if (comparisonResult.length > 0) {
            if (loggedUser.userType === 'researcher') {
                if (comparisonResult.length === 3) {
                    setComparisonComponent(<ComparisonComponent comparisonResult={comparisonResult}/>)
                    console.log(comparisonResult)
                }
            }
            else 
                setComparisonComponent(<ComparisonComponent comparisonResult={comparisonResult}/>)
        }
    },[comparisonResult])

    return comparisonComponent ? comparisonComponent : sessionsList
}
import React, { useEffect, useState } from 'react'
import { useSelector }from 'react-redux'

import { socketToWebServer } from '../../SocketIoClient'
import { SessionList } from './SessionList'
import { ComparisonComponent } from './ComparisonComponent'

export const SessionsComparator = () => {

    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)

    const [comparisonResult, setComparisonResult] = useState([])
    const [sessionsList, setSessionsList] = useState([])

    useEffect(() => {
        if (studentForResearch)
            socketToWebServer.emit('get all user sessions', studentForResearch.email)
        socketToWebServer.on('all user sessions', userSessions => {
            setSessionsList(<SessionList userSessions={userSessions} email={studentForResearch.email} studentConfig={studentForResearch.configResult.config}/>)
        })
        socketToWebServer.on('compared sessions', result => {
            setComparisonResult(prev => [result, ...prev])
        })
        return () => {
            socketToWebServer.off('all user sessions')
            socketToWebServer.off('compared sessions')
        }
    },[]) 

    return comparisonResult.length > 0 ? 
            comparisonResult.length === 1 ? 
                <ComparisonComponent comparisonResult={comparisonResult}/> 
                : 
                comparisonResult.length === 3 ? 
                    <ComparisonComponent comparisonResult={comparisonResult}/>
                    :
                    sessionsList
            :
            sessionsList
}
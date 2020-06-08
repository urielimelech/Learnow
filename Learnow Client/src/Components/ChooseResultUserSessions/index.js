import React, { useEffect, useState } from 'react'
import { socketToWebServer } from '../../SocketIoClient'
import { useSelector, useDispatch } from 'react-redux'
import { SessionsList } from './SessionsList'
import { Loading } from '../Loading'
import { getLastSessionData, updateFitContent } from '../../Redux/Actions'
import { navigate } from 'hookrouter'

export const ChooseResultUserSessions = () => {

    const _dispatch = useDispatch()

    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const studentForResearch = useSelector(state => state.MainReducer.studentForResearch)

    const [userSessions, setUserSessions] = useState(null)

    useEffect(() => {
        if (loggedUser.userType === 'student')
            socketToWebServer.emit('get all user sessions', loggedUser.email)
        else if (studentForResearch) 
            socketToWebServer.emit('get all user sessions', studentForResearch.email)
        socketToWebServer.on('all user sessions', sessions => {
            setUserSessions(sessions)
            _dispatch(updateFitContent(true))
        })
        return () => {
            socketToWebServer.off('all user sessions')
        }
    },[])

    const onSelectSession = e => {
        _dispatch(getLastSessionData(e))
        navigate('/Results')
    }

    return userSessions ? 
            <SessionsList userSessions={userSessions} onSelect={onSelectSession}/> 
        : 
            <Loading/>
}
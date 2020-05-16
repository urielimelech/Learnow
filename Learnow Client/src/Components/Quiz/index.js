import React, { useEffect } from 'react'
import { navigate } from 'hookrouter'
import { useDispatch, useSelector } from 'react-redux'
import QuizComponent from 'react-quiz-component-timestamp-per-answer' 

import { WrapperQuiz } from './styleQuiz'
import { socketToWebServer } from '../../SocketIoClient'
import { isVideoEnded, isConnectedToRoom, getLastSessionData, sessionEnded } from '../../Redux/Actions'
import { CheckMeasureAvarage } from '../CheckMeasureAvarage'

export const Quiz = ({sessionQuiz}) => {

    const _dispatch = useDispatch()
    const ip = useSelector(state => state.MainReducer.ip)
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)

    const disconnectFromWebServer = () => {
        _dispatch(sessionEnded(true))
        _dispatch(isConnectedToRoom(false))
        _dispatch(isVideoEnded(false))
        socketToWebServer.off('data to client')
        socketToWebServer.off('last ended session')
    }

    useEffect(() => {
        socketToWebServer.on('last ended session', sessionData => {
            _dispatch(getLastSessionData(sessionData))
        })
        socketToWebServer.on('data to client', data => {
            console.log(data)
        })
        return (() => loggedUser.userType !== 'student' ? disconnectFromWebServer() : null)
    },[])

    const turnOffIsVideoEnded = () => {
        _dispatch(isVideoEnded(false))
        _dispatch(isConnectedToRoom(false))
        navigate('/Results')
    }

    const onCompleteAction = obj => {
        socketToWebServer.emit('end quiz', {data: obj, ip: ip})
        return <button onClick={turnOffIsVideoEnded}> go and see your Results </button> 
    }

    return <WrapperQuiz>
        <CheckMeasureAvarage/>
        <QuizComponent quiz={sessionQuiz} onComplete={onCompleteAction}/>
    </WrapperQuiz>
}
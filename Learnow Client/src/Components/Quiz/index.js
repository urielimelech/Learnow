import React from 'react'
import { navigate } from 'hookrouter'
import { useDispatch, useSelector } from 'react-redux'
import QuizComponent from 'react-quiz-component-timestamp-per-answer' 

import { WrapperQuiz } from './styleQuiz'
import { socketToWebServer } from '../../SocketIoClient'
import { isVideoEnded, isConnectedToRoom } from '../../Redux/Actions'

export const Quiz = ({sessionQuiz}) => {

    const _dispatch = useDispatch()
    const roomNumber = useSelector(state => state.MainReducer.roomNumber)

    const turnOffIsVideoEnded = () => {
        _dispatch(isVideoEnded(false))
        _dispatch(isConnectedToRoom(false))
        navigate('/Results')
    }

    const onCompleteAction = obj => {
        socketToWebServer.emit('end quiz', {data: obj, roomNumber: roomNumber})
        return <button onClick={turnOffIsVideoEnded}> go and see your Results </button> 
    }

    return <WrapperQuiz>
        <QuizComponent quiz={sessionQuiz} onComplete={onCompleteAction}/>
    </WrapperQuiz>
}
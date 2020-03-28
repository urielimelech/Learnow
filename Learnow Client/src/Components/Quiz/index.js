import React from 'react'
import { navigate } from 'hookrouter'
import { useDispatch } from 'react-redux'
import QuizComponent from 'react-quiz-component-timestamp-per-answer' 

import { QuestionsJson } from './Questions'
import { WrapperQuiz } from './styleQuiz'
import { socketToWebServer } from '../../SocketIoClient'
import { isVideoEnded, isConnectedToRoom } from '../../Redux/Actions'

export const Quiz = () => {

    const _dispatch = useDispatch()

    const turnOffIsVideoEnded = () => {
        _dispatch(isVideoEnded(false))
        _dispatch(isConnectedToRoom(false))
        navigate('/Results')
    }

    const onCompleteAction = obj => {
        socketToWebServer.emit('end quiz', obj)
        console.log('how many times')
        return <button onClick={turnOffIsVideoEnded}> go and see your Results </button> 
    }

    return <WrapperQuiz>
        <QuizComponent quiz={QuestionsJson} onComplete={onCompleteAction}/>
    </WrapperQuiz>
}
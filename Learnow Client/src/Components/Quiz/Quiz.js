import React from 'react'
import { QuestionsJson } from './Questions'
import QuizComponent from 'react-quiz-component-timestamp-per-answer' 
import { WrapperQuiz } from './styleQuiz'
import { socketToWebServer } from '../../SocketIoClient'
import { navigate } from 'hookrouter'


export const Quiz = () => {

    const onCompleteAction = obj => {
        socketToWebServer.emit('end quiz', obj)
        console.log('how many times')
        return <button onClick={() => navigate('/Results')}> go and see your Results </button> 
    }

    return <WrapperQuiz>
        <QuizComponent quiz={QuestionsJson} onComplete={onCompleteAction}/>
    </WrapperQuiz>
}
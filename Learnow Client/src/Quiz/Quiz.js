import React, {useEffect } from 'react'
import {QuestionsJson} from './Questions'
import QuizComponent from 'react-quiz-component' 
import {WrapperQuiz} from './styleQuiz'
import {useSelector} from 'react-redux'
import {socketToWebServer} from '../SocketIoClient'


export const Quiz = () => {

    const IsVideo = useSelector(state => state.VideoReducer)
    console.log(IsVideo)

    // const _dispatch = useDispatch()
   
   useEffect(()=>{
        // _dispatch(isVideo(true))
        console.log(IsVideo)
   },[])


    const onCompleteAction = (obj) =>{
        socketToWebServer.emit('end quiz', obj)
        /* after finish the quiz, send the user to page that shows all the results in charts and visualizations */
    
        console.log(obj)
    }

    return <WrapperQuiz>
        <QuizComponent quiz={QuestionsJson} onComplete={onCompleteAction}/>
    </WrapperQuiz>
}
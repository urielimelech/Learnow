import React, { useEffect, useState } from 'react'
import { QuestionsJson } from './Questions'
import QuizComponent from 'react-quiz-component-timestamp-per-answer' 
import { WrapperQuiz } from './styleQuiz'
import { useSelector, useDispatch } from 'react-redux'
import { socketToWebServer } from '../../SocketIoClient'
import { setIsQuizEnded } from '../../Redux/Actions'
import { navigate } from 'hookrouter'
import { QuizEnded } from './QuizEnded'


export const Quiz = () => {

    // const IsVideo = useSelector(state => state.MainReducer)
    // console.log(IsVideo)

    // const isQuizEnded = useSelector(state => state.MainReducer.isQuizEnded)

    // const [isQuizFinished, setIsQuizFinished] = useState(false)

    // const _dispatch = useDispatch()

    // const [isQuizEnded, setIsQuizEnded] = useState(false)
   
    // useEffect(()=>{ 
    //     console.log(isQuizFinished)
    //     if(isQuizFinished === true){
    //         console.log(isQuizFinished)
    //         _dispatch(setIsQuizEnded(true))
    //     }
    // },[isQuizFinished])


    // useEffect(() =>{
    //     console.log('isQuizEnded', isQuizEnded)
    // },[isQuizEnded])

    const onCompleteAction = obj => {
        socketToWebServer.emit('end quiz', obj)
        // setIsQuizFinished(true)
    
        // _dispatch(setIsQuizEnded(true))
        /* after finish the quiz, send the user to page that shows all the results in charts and visualizations */
        console.log(obj)
    }

    return <WrapperQuiz>
        <QuizComponent quiz={QuestionsJson} onComplete={onCompleteAction}/>
        <QuizEnded/>
        {/* <button onClick={() => navigate('/Results')}> go and see your Results </button> */}
        {/* {isQuizEnded ? <button onClick={() => navigate('/Results')}> go and see your Results </button> : null} */}
    </WrapperQuiz>
}
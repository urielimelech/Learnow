import React, {useEffect } from 'react'
import {QuestionsJson} from './Questions'
import QuizComponent from 'react-quiz-component' 
import {WrapperQuiz} from './styleQuiz'
import {useSelector, useDispatch} from 'react-redux'
import {isVideo} from '../Actions/QuizAction'
import {socketToWebServer} from '../SocketIoClient'


export const Quiz = () => {

    const IsVideo = useSelector(state => state.QuizReducer)
    console.log(IsVideo)
    // console.log(Actions)

    const _dispatch = useDispatch()
   
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

// export const Quiz = () => {

// const [jsonQ, setJsonQ] = useState (null)
// const [model, setModel] = useState (null)

// const completeQuiz = (survey, options) => {
//     console.log(survey.valuesHash)
//     console.log(survey)
// }

// const getResult = (s, options) => {
//     if (options.success)
//         console.log(options.datalist)
// }

// useEffect(() =>{
//     console.log('model', model)
//  },[model])

//  useEffect(()=>{
//      setModel(new Survey.Model(jsonQ))
//  },[jsonQ])

//  useEffect (() =>{
//      setJsonQ(QuestionsJson)
//  },[])

   
//  return model === null ? null : <div>

//         <Survey.Survey model={model} onComplete={completeQuiz} onGetResult={getResult}/>
//         {console.log(model.data)}
//         {console.log(Survey.Survey)}
//     </div>
// }
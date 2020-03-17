import React, {useState, useEffect } from 'react'
import {QuestionsJson} from './Questions'
import QuizComponent from 'react-quiz-component' 
import {WrapperQuiz} from './styleQuiz'

export const Quiz = () => {

    const onCompleteAction = (obj) =>{
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
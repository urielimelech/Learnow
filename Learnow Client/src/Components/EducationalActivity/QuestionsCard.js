import React from 'react'
import { Loading } from '../Loading'
import { useSelector } from 'react-redux'
import { CardComponent } from '../CardComponent'
import { StyledCardComponent } from './EducationalActivityStyle'

export const QuestionsCard = () => {

    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)

    const renderQuestionsCards = () => {
        const quizData = lastSessionData.quizData
        const questions = quizData.questions
        
        return questions.map((elem, index) => {
            const question = elem.question
            const correctAnswer = elem.answers[Number(elem.correctAnswer) - 1]
            const minutesAnswerInVideo =  Math.floor(Number(elem.timeOfAnswerInVideoBySeconds) / 60)
            const secondsAnswerInVideo = Number(elem.timeOfAnswerInVideoBySeconds) % 60
            const checkMinutes = minutesAnswerInVideo < 10 ? `0${ Math.floor(Number(elem.timeOfAnswerInVideoBySeconds) / 60)}` : Math.floor(Number(elem.timeOfAnswerInVideoBySeconds) / 60)
            const checkSeconds = secondsAnswerInVideo < 10 ? `0${Number(elem.timeOfAnswerInVideoBySeconds) % 60}` : Number(elem.timeOfAnswerInVideoBySeconds) % 60
            const answerInVideo = `${checkMinutes} : ${checkSeconds}`
            const userInput = quizData.userInput[index].index - 1
            const userAnswer = elem.answers[userInput]
            const img = userAnswer=== correctAnswer ? require('../../images/correct.png') : require('../../images/incorrect.png')

            return <CardComponent 
                style= {StyledCardComponent}
                key={index}
                headerText={`Question Number ${index + 1}`}
                isAbleToExpand={true}
                expandedText={[
                    `Question Number ${index + 1}: `, question, 
                    'Correct Answer: ', correctAnswer, 
                    'User Answer: ', userAnswer, 
                    'Answer In Video:', answerInVideo
                ]}
                img={img}
            />
        })
    }

    return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
        {Object.keys(lastSessionData).length > 0 ? renderQuestionsCards() : <Loading/>}
    </div>
    
}
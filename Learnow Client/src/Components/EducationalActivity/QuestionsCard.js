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
            const answerInVideo = Number(elem.timeOfAnswerInVideoBySeconds)
            const userInput = quizData.userInput[index].index - 1

            return <CardComponent 
                style= {StyledCardComponent}
                key={index}
                headerText={`Question Number ${index + 1}`}
                isAbleToExpand={true}
                expandedText={[
                    'Question: ', question, 
                    'Correct Answer: ', correctAnswer, 
                    'User Answer: ', userInput, 
                    'Answer In Video:', answerInVideo
                ]}
            />
        })
    }

    return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        {Object.keys(lastSessionData).length > 0 ? renderQuestionsCards() : <Loading/>}
    </div>
    
}
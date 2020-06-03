import React from 'react'
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import { QuestionsCard } from './QuestionsCard'


export const EducationalActivity = () => {

    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)
   
    return <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', paddingTop: 30}}>
            <ReactPlayer 
                url={ lastSessionData.quizData ? lastSessionData.quizData.videoUrl : null}
                width={350}
                height={200}
                controls={true}
            />
            <QuestionsCard/>
    </div>
}
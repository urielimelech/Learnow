import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactPlayer from 'react-player'
import { QuestionsCard } from './QuestionsCard'
import { updateFitContent } from '../../Redux/Actions'
import { WrapperReactPlayer } from './EducationalActivityStyle'


export const EducationalActivity = () => {

    const lastSessionData = useSelector(state => state.MainReducer.lastSessionData)

    const _dispatch = useDispatch()

    useEffect(() => {
        _dispatch(updateFitContent(true))
    },[])
   
    return <div style={WrapperReactPlayer}>
            <ReactPlayer 
                url={ lastSessionData.quizData ? lastSessionData.quizData.videoUrl : null}
                width={350}
                height={200}
                controls={true}
            />
            <QuestionsCard/>
    </div>
}
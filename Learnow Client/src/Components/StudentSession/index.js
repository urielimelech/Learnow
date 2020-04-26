import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { VideoPlayer } from '../VideoPlayer'
import { sessionActivity } from '../SessionActivity'
import { Quiz } from '../Quiz'

export const StudentSession = () => {

    const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)

    const [currSessionActivityData, setCurrSessionActivityData] = useState(null)

    useEffect(() => {
        setCurrSessionActivityData(sessionActivity[0])
    },[])

    return (
        <div>
            {currSessionActivityData ? 
                IsVideoEnded ? 
                    <Quiz sessionQuiz={currSessionActivityData.quizSummary}/>
                :
                    <VideoPlayer sessionVideo={currSessionActivityData.videoUrl} sessionQuiz={currSessionActivityData.quizSummary}/>
            :
                'loading'}
        </div>
    )
}
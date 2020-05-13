import React from 'react'
import { useSelector } from 'react-redux'

import { VideoPlayer } from '../VideoPlayer'
import { Quiz } from '../Quiz'
import { Loading } from '../Loading'

export const StudentSession = () => {

    const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)
    const session = useSelector(state => state.MainReducer.session)
    
    return (
        <div>
            {session ? 
                IsVideoEnded ? 
                    <Quiz sessionQuiz={session.quizSummary}/>
                :
                    <VideoPlayer sessionVideo={session.videoUrl} sessionQuiz={session.quizSummary}/>
            :
                <Loading/>}
        </div>
    )
}
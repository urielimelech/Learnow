import React from 'react'
import { useSelector } from 'react-redux'

import { VideoPlayer } from '../VideoPlayer'
import { Quiz } from '../Quiz'
import { Loading } from '../Loading'
import { LiveChart } from './LiveChart'

export const StudentSession = () => {

    const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)
    const session = useSelector(state => state.MainReducer.session)
    
    return (
        <div>
            {session ? 
                <div>
                    {IsVideoEnded ? 
                        <Quiz sessionQuiz={session.quizSummary}/>
                    :
                        <VideoPlayer sessionVideo={session.quizSummary.videoUrl} sessionQuiz={session.quizSummary}/>}
                    <LiveChart/>
                </div>
            :
                <Loading/>}
        </div>
    )
}
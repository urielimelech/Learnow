import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { VideoPlayer } from '../VideoPlayer'
import { sessionActivity } from '../SessionActivity'
import { Quiz } from '../Quiz'
import { sessionEnded } from '../../Redux/Actions'
import { Loading } from '../Loading'

export const ResearcherSession = () => {

    const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)
    const isSessionEnded = useSelector(state => state.MainReducer.isSessionEnded)
    const session = useSelector(state => state.MainReducer.session)

    const _dispatch = useDispatch()

    useEffect(() => {
        if (isSessionEnded) {
            _dispatch(sessionEnded(false))
        }
    },[isSessionEnded])

    return session ?
            IsVideoEnded ? 
                <Quiz sessionQuiz={session.quizSummary}/>
            : 
                <VideoPlayer sessionVideo={session.videoUrl} sessionQuiz={session.quizSummary}/>
        :
            <Loading/>
}
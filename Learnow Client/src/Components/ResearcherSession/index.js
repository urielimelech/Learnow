import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { VideoPlayer } from '../VideoPlayer'
import { sessionActivity } from '../SessionActivity'
import { Quiz } from '../Quiz'
import { sessionEnded } from '../../Redux/Actions'

export const ResearcherSession = () => {

    const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)
    const isSessionEnded = useSelector(state => state.MainReducer.isSessionEnded)

    const [currSessionActivityData, setCurrSessionActivityData] = useState(null)
    const [sessionNumber, setSessionNumber] = useState(0)

    const _dispatch = useDispatch()

    useEffect(() => {
        setCurrSessionActivityData(sessionActivity[sessionNumber])
    },[])

    useEffect(() => {
        setCurrSessionActivityData(sessionActivity[sessionNumber])
    },[sessionNumber])

    useEffect(() => {
        if (isSessionEnded) {
            setSessionNumber(1)
            _dispatch(sessionEnded(false))
        }
    },[isSessionEnded])

    return currSessionActivityData ?
            IsVideoEnded ? 
                <Quiz sessionQuiz={currSessionActivityData.quizSummary}/>
            : 
                <VideoPlayer sessionVideo={currSessionActivityData.videoUrl} sessionQuiz={currSessionActivityData.quizSummary}/>
        :
            'loading'
}
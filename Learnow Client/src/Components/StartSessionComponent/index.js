import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'hookrouter'

import { VideoPlayer } from '../VideoPlayer'
import { Quiz } from '../Quiz'
import { sessionActivity } from '../SessionActivity'

export const StartSessionComponent = () => {

    const isConnectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)
    const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)
    const IsFirstSession = useSelector(state => state.MainReducer.isFirstSession)

    const [currSessionActivityData, setCurrSessionActivityData] = useState([])

    // const roomNumber = useSelector(state => state.MainReducer.roomNumber)

  // useEffect(()=>{
  //   console.log({roomNumber})
  // },[roomNumber])
  
  useEffect(() => {
    if (IsFirstSession !== null){
      switch (IsFirstSession) {
        case (true): return setCurrSessionActivityData(sessionActivity[0])
        case (false): return setCurrSessionActivityData(sessionActivity[1])
      }
    }
  },[IsFirstSession])

  useEffect(() => {
    if (!isConnectedToRoom)
      navigate('/')
  },[isConnectedToRoom])
  
    return (
      currSessionActivityData.length !== 0 ? (
          IsVideoEnded ? 
            <Quiz sessionQuiz={currSessionActivityData.quizSummary}/>
          :
            <VideoPlayer sessionVideo={currSessionActivityData.videoUrl} sessionQuiz={currSessionActivityData.quizSummary}/>
        )
      :
        null
    )
  }
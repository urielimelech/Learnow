import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'hookrouter'

import { VideoPlayer } from '../VideoPlayer'
import { Quiz } from '../Quiz'

export const StartSessionComponent = () => {

    const isConnectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)
    const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)
    // const roomNumber = useSelector(state => state.MainReducer.roomNumber)

  // useEffect(()=>{
  //   console.log({roomNumber})
  // },[roomNumber])

  // useEffect(() => {
  //   if (!isConnectedToRoom)
  //     navigate('/')
  // },[isConnectedToRoom])
  
    return IsVideoEnded ? <Quiz/> : <VideoPlayer/>
  }
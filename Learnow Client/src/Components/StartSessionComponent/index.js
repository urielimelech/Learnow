import React, {useEffect} from 'react'

import { VideoPlayer } from '../VideoPlayer'
import { Quiz} from '../Quiz/Quiz'
import { useSelector } from 'react-redux'
import { RoomNumberForm } from '../RoomNumberForm'


export const StartSessionComponent = () => {

    // const isInRoom = useSelector(state => state.MainReducer.isConnectedToRoom)
    const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)
    // console.log(isInRoom)
    const roomNumber = useSelector(state => state.MainReducer.roomNumber)

  useEffect(()=>{
    console.log({roomNumber})
  },[roomNumber])
  
    return (
        IsVideoEnded ? <Quiz/> : <VideoPlayer/> 
    )
  }
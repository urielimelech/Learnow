import React from 'react'

import { VideoPlayer } from '../VideoPlayer'
import { Quiz} from '../Quiz/Quiz'
import { useSelector } from 'react-redux'
import { RoomNumberForm } from '../RoomNumberForm'


export const Logged = () => {

    const isInRoom = useSelector(state => state.MainReducer.isConnectedToRoom)
    const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)
    console.log(isInRoom)
  
    return (
      <div style={{width:'100%'}}>
        {isInRoom ? IsVideoEnded ? <Quiz/> : <VideoPlayer/> : <RoomNumberForm/>}
      </div>
    );
  }
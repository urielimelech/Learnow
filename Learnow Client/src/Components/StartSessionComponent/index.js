import React from 'react'
import { useSelector } from 'react-redux'

import { ConnectionToRoom } from '../ConnectionToRoom'
import { StudentSession } from '../StudentSession'
import { ResearcherSession } from '../ResearcherSession'
import { SensorErrors } from '../SensorErrors'
import { Loading } from '../Loading'
import { WINDOW_HEIGHT } from '../../consts'

export const StartSessionComponent = () => {

  const connectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)
  const loggedUser = useSelector(state => state.MainReducer.loggedUser)

  return (
    <div style={{height: WINDOW_HEIGHT}}>
      <ConnectionToRoom/>
      <SensorErrors/>
      {connectedToRoom ? 
        loggedUser.userType === 'student' ? <StudentSession/> : <ResearcherSession/>
      :
        <Loading/>
      }
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { setIp, isConnectedToRoom, notificationVisible } from '../../Redux/Actions'
import { VideoPlayer } from '../VideoPlayer'
import { Quiz } from '../Quiz'
import { sessionActivity } from '../SessionActivity'
import { socketToWebServer } from '../../SocketIoClient'
import { ToastNotification } from '../Toastify'

export const StartSessionComponent = () => {

  const IsVideoEnded = useSelector(state => state.MainReducer.IsVideoEnded)
  const IsFirstSession = useSelector(state => state.MainReducer.isFirstSession)

  const [currSessionActivityData, setCurrSessionActivityData] = useState([])
  const [roomCheck, setRoomCheck] = useState(null)
  const [errorNeuro, setErrorNeuro] = useState(null)

  const ip = useSelector(state => state.MainReducer.ip)
  const connectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)
  const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)

  const _dispatch = useDispatch()

  const enteredRoom = () => socketToWebServer.on('enter room', status => {
    if (status)
      _dispatch(isConnectedToRoom(status))
    else {
      _dispatch(notificationVisible(true))
      setErrorNeuro(<ToastNotification renderComponent={'wait for neurosky headset to connect or check if the headset is turned on'}/>)
    }
  })

  useEffect(() => {
    // getComputerIp()
    _dispatch(setIp('176.231.3.171'))
    enteredRoom()
  },[])
  
  useEffect(() => {
    setCurrSessionActivityData(sessionActivity[0])
    if (IsFirstSession !== null){
      switch (IsFirstSession) {
        case (true): return setCurrSessionActivityData(sessionActivity[0])
        case (false): return setCurrSessionActivityData(sessionActivity[1])
        default: return
      }
    }
  },[IsFirstSession])

  useEffect(() => {
    if (ip.length !== 0){
      setRoomCheck(setInterval(() => {
        socketToWebServer.emit('ip', ip)
      }, 5000))
    }
  },[ip])

  useEffect(() => {
    if (connectedToRoom){
      clearInterval(roomCheck)
    }
  },[connectedToRoom])

  useEffect(() => {
    if (!isNotificationVisible)
        setErrorNeuro(null)
  },[isNotificationVisible])

  const getComputerIp = async () => {
    try {
        const result = await axios.get (
            'https://cors-anywhere.herokuapp.com/http://api.ipify.org:80'
        )
        _dispatch(setIp(result.data))
    }
    catch (e){
        console.log('catch', 'error gettin IP address')
    }
  }

  return (
    currSessionActivityData.length !== 0 ? (
        IsVideoEnded ? 
          <Quiz sessionQuiz={currSessionActivityData.quizSummary}/>
        :
          connectedToRoom ? 
            <VideoPlayer sessionVideo={currSessionActivityData.videoUrl} sessionQuiz={currSessionActivityData.quizSummary}/>
          :
            <div>
              loading component
              {errorNeuro}
            </div>
      )
    :
      <div>null</div>
  )
}
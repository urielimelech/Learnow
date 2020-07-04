import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.min.css'

import { WrapperVideo } from './VideoStyle'
import { isVideoEnded, notificationVisible } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { ToastNotification } from '../Toastify'
import { VideoWarning } from './VideoWarning'
import { CheckMeasureAvarage } from '../CheckMeasureAvarage'
import ReactPlayer from 'react-player'

export const VideoPlayer = ({sessionVideo, sessionQuiz}) =>{

  const _dispatch = useDispatch()
  const [index, setIndex] = useState(0)
  const [videoState, setVideoState] = useState(null)
  const [watchVideoWarning, setWatchVideoWarning] = useState(null)

  const ip = useSelector(state => state.MainReducer.ip)
  const loggedUser = useSelector(state => state.MainReducer.loggedUser)
  const activity = useSelector(state => state.MainReducer.chooseActivity)

  const answerTimeInVideo = sessionQuiz.questions.map(elem => {
    return Number(elem.timeOfAnswerInVideoBySeconds)
  }).sort( (a,b) => a-b )

  useEffect(() => {
    if(videoState)
      emitWhenAnswerOccuredInVideo()
  },[videoState])

  const emitWhenAnswerOccuredInVideo = () => {
    if (Math.floor(videoState.playedSeconds) === answerTimeInVideo[index]) {
      socketToWebServer.emit('answer in video', ({date: Date.now(), ip: ip}))
      const i = index + 1
      setIndex(i)
    }
    else if (Math.floor(videoState.playedSeconds) > answerTimeInVideo[index]) {
      if (watchVideoWarning === null){
        _dispatch(notificationVisible(true))
        setWatchVideoWarning(<ToastNotification renderComponent={<VideoWarning/>}/>)
      }
    }
  }

  const onStartVideo = () => {
    const email = loggedUser.email
    socketToWebServer.emit('ready for data stream', ({ip: ip, email: email, activity: activity}))
  }

  const onEndVideo = () => {
    socketToWebServer.emit('end of video', ip)
    _dispatch(isVideoEnded(true))
  }

  const onProgressVideo = videoState => {
    setVideoState(videoState)
  }

  return  <WrapperVideo>
            <ReactPlayer
              style={{marginTop: 20}}
              url={sessionVideo}
              controls={true}
              onStart = {onStartVideo}
              onEnded = {onEndVideo}
              onProgress = {onProgressVideo}
            />
            {watchVideoWarning}
            <CheckMeasureAvarage/>
          </WrapperVideo>
}
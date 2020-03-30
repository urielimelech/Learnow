import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { WrapperVideo, Video } from './VideoStyle'
import { isVideoEnded } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { QuestionsJson } from '../Quiz/Questions'

export const VideoPlayer = ()=>{

  const _dispatch = useDispatch()
  const [index, setIndex] = useState(0)
  const [videoState, setVideoState] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAlreadyOpened, setIsAlreadyOpened] = useState(false)

  const roomNumber = useSelector(state => state.MainReducer.roomNumber)

  useEffect(()=>{
    console.log({roomNumber})
  },[])

  useEffect(() => {
    if(videoState)
      emitWhenAnswerOccuredInVideo()
  },[videoState])

  useEffect(()=>{
    if (isModalOpen)
      setIsAlreadyOpened(true)
  },[isModalOpen])

  const emitWhenAnswerOccuredInVideo = () => {
    if (Math.floor(videoState.playedSeconds) === answerTimeInVideo[index]) {
        socketToWebServer.emit('answer in video', ({date: Date.now(), roomNumber: roomNumber}))
        const i = index + 1
        setIndex(i)
    }
    else if (Math.floor(videoState.playedSeconds) > answerTimeInVideo[index]) {
      console.log('user need to watch the full video')
      setIsModalOpen(true)
    }
  }

  const answerTimeInVideo = QuestionsJson.questions.map(elem => {
    return Number(elem.timeOfAnswerInVideoBySeconds)
  }).sort( (a,b) => a-b )
  
  socketToWebServer.on('connected', data => console.log(data, 'with web server'))

  socketToWebServer.on('session ended from headset', () => {
    console.log('session ended from headset')
  })

  const onStartVideo = () => {
    console.log(roomNumber)
    socketToWebServer.emit('ready for data stream', roomNumber)
    socketToWebServer.on('data to client', data => {
      console.log(data)
    })
  }

  const onEndVideo = () => {
    socketToWebServer.emit('end of video', roomNumber)
      _dispatch(isVideoEnded(true))
  }

  const onProgressVideo = videoState => {
    setVideoState(videoState)
  }

  const optionsToast = {
    // onOpen:false, 
    // onClose:true,  
    // closeToast:  true,
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }

  const warningVideo = () =>{
    toast.warn('please, watch the full video', optionsToast)
  }

  // socketToWebServer.on('session ended by headset', () => {
  //   console.log('session ended from headset')
  // })

  return  <WrapperVideo>
            <Video
              url="https://www.youtube.com/watch?v=DIJYAWB3MhI"
              controls={true}
              onStart = {onStartVideo}
              onEnded = {onEndVideo}
              onProgress = {onProgressVideo}
              // wrapper={Video}
              // width={'50%'}
              // height={450}
            />

            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />     
            {isModalOpen && !isAlreadyOpened ? warningVideo() : null} 
          </WrapperVideo>
}
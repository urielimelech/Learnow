import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { WrapperVideo, Video } from './VideoStyle'
import { isVideoEnded } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'

export const VideoPlayer = ({sessionVideo, sessionQuiz}) =>{

  const _dispatch = useDispatch()
  const [index, setIndex] = useState(0)
  const [videoState, setVideoState] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAlreadyOpened, setIsAlreadyOpened] = useState(false)

  const roomNumber = useSelector(state => state.MainReducer.roomNumber)

  const warnImageSrc = 'https://png2.cleanpng.com/sh/e7d54f647617ebfe6feb8fa64ae5d38d/L0KzQYi4UsE3N5dpSpGAYUO4QrOCg8dmbJRoSJC9MES2Q4SBVcE2OWQ5S6Y5MUK4QYq9TwBvbz==/5a352b9c7edcc0.4043338515134340125196.png'

  const answerTimeInVideo = sessionQuiz.questions.map(elem => {
    return Number(elem.timeOfAnswerInVideoBySeconds)
  }).sort( (a,b) => a-b )
    
  socketToWebServer.on('connected', data => console.log(data, 'with web server'))

  socketToWebServer.on('session ended from headset', () => {
    console.log('session ended from headset')
  })

  useEffect(() => {
    if(videoState)
      emitWhenAnswerOccuredInVideo()
  },[videoState])

  useEffect(()=>{
    if(isModalOpen)
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
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }

  const Img = () => {
    return (
      <div>
        <img style={{objectFit: 'contain', height: '40px'}} src={warnImageSrc}/>
        please, watch the full video
      </div>
    )
  }

  const warningVideo = () =>{
    toast.warn(<Img/>, optionsToast)
  }

  //stop the video if the neurosky disconnected
  // socketToWebServer.on('session ended by headset', () => {
  //   console.log('session ended from headset')
  // })

  return  <WrapperVideo>
            <Video
              url={sessionVideo}
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
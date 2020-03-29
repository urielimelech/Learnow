import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HyperModal from 'react-hyper-modal'

import { WrapperVideo, Video } from './VideoStyle'
import { isVideoEnded } from '../../Redux/Actions'
import { socketToWebServer } from '../../SocketIoClient'
import { QuestionsJson } from '../Quiz/Questions'

export const VideoPlayer = ()=>{

  const _dispatch = useDispatch()
  const [index, setIndex] = useState(0)
  const [videoState, setVideoState] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const roomNumber = useSelector(state => state.MainReducer.roomNumber)

  useEffect(()=>{
    console.log({roomNumber})
  },[])

  useEffect(() => {
    if(videoState)
      emitWhenAnswerOccuredInVideo()
  },[videoState])

  const emitWhenAnswerOccuredInVideo = () => {
    if (Math.floor(videoState.playedSeconds) === answerTimeInVideo[index]) {
      socketToWebServer.emit('answer in video', Date.now())
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
    socketToWebServer.emit('end of video', )
      _dispatch(isVideoEnded(true))
  }

  const onProgressVideo = videoState => {
    setVideoState(videoState)
  }

  const ModalContent = () => {
    return (
      <div>
        user need to watch the full video
        <button onClick={() => setIsModalOpen(false)}> OK </button>
      </div>
    )
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
            <HyperModal isOpen={isModalOpen}><ModalContent/></HyperModal>
          </WrapperVideo>
}
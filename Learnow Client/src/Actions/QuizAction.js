import {IS_VIDEO_ENDED} from '../ActionTypes/QuizActionType'
// import {useDispatch} from 'react-redux'

// const _dispatch = useDispatch()

export const isVideo = data => ({ type: IS_VIDEO_ENDED, data: data })

console.log('isvideo', isVideo)

export const handleIsVideoEnded = video => {
//   _dispatch(isVideo(video))
  console.log(video)
}


// export {
//     isVideo,
//     handleIsVideoEnded
// }

import {IS_VIDEO_ENDED} from '../ActionTypes/VideoActionType'

export const isVideoEnded = data => ({ type: IS_VIDEO_ENDED, data: data })

console.log('isvideo', isVideoEnded)



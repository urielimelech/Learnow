import {IS_VIDEO_ENDED, IS_CONNECTED_TO_ROOM, UPDATE_ROOM_NUMBER, IS_QUIZ_ENDED, LAST_SESSION_DATA } from '../ActionTypes'

export const isVideoEnded = data => ({ type: IS_VIDEO_ENDED, data: data })

export const isConnectedToRoom = isConnected => ({type: IS_CONNECTED_TO_ROOM, data: isConnected})

export const updateRoomNumber = roomNumber => ({type: UPDATE_ROOM_NUMBER, data: roomNumber})

export const setIsQuizEnded = isQuizEnded => ({type: IS_QUIZ_ENDED, data: isQuizEnded})

export const getLastSessionData = lastSessionData => ({type: LAST_SESSION_DATA, data: lastSessionData})


console.log('isvideo', isVideoEnded)
console.log('isconnected', isConnectedToRoom)
console.log('updateRoomNumber', updateRoomNumber)


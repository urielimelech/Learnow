import {IS_VIDEO_ENDED, IS_CONNECTED_TO_ROOM, UPDATE_ROOM_NUMBER } from '../ActionTypes'

export const isVideoEnded = data => ({ type: IS_VIDEO_ENDED, data: data })

export const isConnectedToRoom = isConnected => ({type: IS_CONNECTED_TO_ROOM, data: isConnected})

export const updateRoomNumber = roomNumber => ({type: UPDATE_ROOM_NUMBER, data: roomNumber})

console.log('isvideo', isVideoEnded)
console.log('isconnected', isConnectedToRoom)



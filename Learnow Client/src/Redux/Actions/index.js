import {IS_VIDEO_ENDED, IS_CONNECTED_TO_ROOM, UPDATE_ROOM_NUMBER, LAST_SESSION_DATA } from '../ActionTypes'

export const isVideoEnded = data => ({ type: IS_VIDEO_ENDED, data: data })

export const isConnectedToRoom = isConnected => ({type: IS_CONNECTED_TO_ROOM, data: isConnected})

export const updateRoomNumber = roomNumber => ({type: UPDATE_ROOM_NUMBER, data: roomNumber})

export const getLastSessionData = lastSessionData => ({type: LAST_SESSION_DATA, data: lastSessionData})
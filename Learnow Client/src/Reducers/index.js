import { IS_VIDEO_ENDED, IS_CONNECTED_TO_ROOM, UPDATE_ROOM_NUMBER } from '../ActionTypes'

const initialState = {
  IsVideoEnded: false,
  isConnectedToRoom: false,
  roomNumber: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_VIDEO_ENDED:
      return {
        ...state,
        IsVideoEnded: action.data
      }
    case IS_CONNECTED_TO_ROOM:
      return {
        ...state,
        isConnectedToRoom: action.data
      }
    case UPDATE_ROOM_NUMBER:
      return {
        ...state,
        roomNumber: action.data
      }
    default:
      return state
  }
}

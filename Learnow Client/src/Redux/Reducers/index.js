import { IS_VIDEO_ENDED, IS_CONNECTED_TO_ROOM, UPDATE_ROOM_NUMBER, LAST_SESSION_DATA} from '../ActionTypes'

const initialState = {
  navigation: '',
  IsVideoEnded: false,
  isConnectedToRoom: false,
  roomNumber: '',
  lastSessionData: {}
}

export default (state = initialState, action) => {
  console.log(action)
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
    case LAST_SESSION_DATA:
      return {
        ...state,
        lastSessionData: action.data
      }
    default:
      return state
  }
}

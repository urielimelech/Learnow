import { IS_VIDEO_ENDED, IS_CONNECTED_TO_ROOM, UPDATE_ROOM_NUMBER, LAST_SESSION_DATA, IS_FIRST_SESSION, LOGIN, LOGOUT, REGISTER } from '../ActionTypes'

const initialState = {
  navigation: '',
  IsVideoEnded: false,
  isConnectedToRoom: false,
  roomNumber: '',
  lastSessionData: {},
  isFirstSession: null,
  loggedUser: {}
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
    case LAST_SESSION_DATA:
      return {
        ...state,
        lastSessionData: action.data
      }
    case IS_FIRST_SESSION:
      return {
        ...state,
        isFirstSession: action.data
      }
    case LOGIN:
      return {
        ...state,
        loggedUser: action.data
      }
    case LOGOUT:
      return {
        ...state,
        loggedUser: action.data
      }
    case REGISTER:
      return {
        ...state,
        loggedUser: action.data
      }
    default:
      return state
  }
}

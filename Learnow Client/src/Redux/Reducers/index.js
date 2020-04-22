import { IS_VIDEO_ENDED, IS_CONNECTED_TO_ROOM, LAST_SESSION_DATA, IS_FIRST_SESSION, LOGIN, LOGOUT, REGISTER, IS_VERIFY, SET_IP, SET_NOTIFICATION_VISIBLE } from '../ActionTypes'

const initialState = {
  navigation: '',
  IsVideoEnded: false,
  isConnectedToRoom: false,
  lastSessionData: {},
  isFirstSession: null,
  loggedUser: {},
  isVerify: null,
  ip: '',
  isNotificationVisible: false
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
        loggedUser: action.data,
        isVerify: null
      }
    case REGISTER:
      return {
        ...state,
        loggedUser: action.data
      }
    case IS_VERIFY:
      return {
        ...state,
        isVerify: action.data
      }
    case SET_IP:
      return {
        ...state,
        ip: action.data
      }
    case SET_NOTIFICATION_VISIBLE:
      return {
        ...state,
        isNotificationVisible: action.data
      }
    default:
      return state
  }
}

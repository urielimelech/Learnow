import { 
  IS_VIDEO_ENDED,
  IS_CONNECTED_TO_ROOM,
  LAST_SESSION_DATA,
  LOGIN,
  LOGOUT,
  REGISTER,
  IS_VERIFY,
  SET_IP,
  SET_NOTIFICATION_VISIBLE,
  SESSION_ENDED,
  RESET_STYLE_LIST,
  SET_ACTIVITY_CARD,
  CHOOSE_ACTIVITY,
  SESSION_ACTIVITY
} from '../ActionTypes'

const initialState = {
  navigation: '',
  IsVideoEnded: false,
  isConnectedToRoom: false,
  lastSessionData: {},
  loggedUser: {},
  isVerify: null,
  ip: '',
  isNotificationVisible: false,
  isSessionEnded: false,
  resetStyle: false,
  activitiesCards: null,
  chooseActivity: null,
  session: null 
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
    case SESSION_ENDED:
      return {
        ...state,
        isSessionEnded: action.data
      }
    case RESET_STYLE_LIST:
      return {
        ...state,
        resetStyle: action.data
      }
    case SET_ACTIVITY_CARD:
      return {
        ...state,
        activitiesCards: action.data
      }
    case CHOOSE_ACTIVITY:
      return {
        ...state,
        chooseActivity: action.data
      }
      case SESSION_ACTIVITY:
      return {
        ...state,
        session: action.data
      }
    default:
      return state
  }
}

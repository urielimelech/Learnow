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
  SESSION_ACTIVITY,
  STUDENT_FOR_RESEARCH,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  FIT_CONTENT,
  USER_CARDS,
  IS_SEARCHING,
  IS_SHOW_BREAK_DIALOG
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
  session: null,
  studentForResearch: null,
  windowWidth: 0,
  windowHeight: 0,
  fitContent: false,
  userCards: null,
  isSearching: false,
  isShowBreakDialog: false
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
    case STUDENT_FOR_RESEARCH:
      return {
        ...state,
        studentForResearch: action.data
      }
    case WINDOW_WIDTH:
      return {
        ...state,
        windowWidth: action.data
      }
    case WINDOW_HEIGHT:
      return {
        ...state,
        windowHeight: action.data
      }
    case FIT_CONTENT:
      return {
        ...state,
        fitContent: action.data
      }
    case USER_CARDS:
      return {
        ...state,
        userCards: action.data
      }
    case IS_SEARCHING:
      return {
        ...state,
        isSearching: action.data
      }
    case IS_SHOW_BREAK_DIALOG:
      return {
        ...state,
        isShowBreakDialog: action.data
      }
    default:
      return state
  }
}

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
    IS_SEARCHING
} from '../ActionTypes'

export const isVideoEnded = data => ({ type: IS_VIDEO_ENDED, data: data })

export const isConnectedToRoom = isConnected => ({type: IS_CONNECTED_TO_ROOM, data: isConnected})

export const getLastSessionData = lastSessionData => ({type: LAST_SESSION_DATA, data: lastSessionData})

export const login = loginData => ({type: LOGIN, data: loginData})

export const logout = () => ({type: LOGOUT, data: {}})

export const register = registerData => ({type: REGISTER, data: registerData})

export const isVerify = verified => ({type: IS_VERIFY, data: verified})

export const setIp = ip => ({type: SET_IP, data: ip})

export const notificationVisible = isVisible => ({type: SET_NOTIFICATION_VISIBLE, data: isVisible})

export const sessionEnded = isSessionEnded => ({type: SESSION_ENDED, data: isSessionEnded})

export const resetStyleList = resetStyle => ({type: RESET_STYLE_LIST, data: resetStyle})

export const setActivitiesCards = activityCard => ({type: SET_ACTIVITY_CARD, data: activityCard})

export const chooseActivity = activity => ({type: CHOOSE_ACTIVITY, data: activity})

export const session = session => ({type: SESSION_ACTIVITY, data: session})

export const updateStudentForResearch = studentMail => ({type: STUDENT_FOR_RESEARCH, data: studentMail})

export const updateWindowWidth = windowWidth => ({type: WINDOW_WIDTH, data: windowWidth})

export const updateWindowHeight = windowHeight => ({type: WINDOW_HEIGHT, data: windowHeight})

export const updateFitContent = fitContent => ({type: FIT_CONTENT, data: fitContent})

export const updateUserCards = userCards => ({type: USER_CARDS, data: userCards})

export const setSearching = searching => ({type: IS_SEARCHING, data: searching})
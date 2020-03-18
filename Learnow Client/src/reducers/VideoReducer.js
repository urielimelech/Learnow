import { IS_VIDEO_ENDED } from '../ActionTypes/VideoActionType'

const initialState = {
  IsVideoEnded: false
}

export default (state = initialState, action) => {
  switch (action.type) {
      
    case IS_VIDEO_ENDED:
      return {
        ...state,
        IsVideoEnded: action.data
      }
    default:
      return state
  }
}

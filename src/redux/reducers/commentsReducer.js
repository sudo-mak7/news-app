import { SET_COMMENTS } from '../constants'

const initialState = { comments:  [] }

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action?.payload
      }
    default: return state
  }
}

export default commentsReducer

import { SET_NEWS_ERROR } from '../constants'

const initialState = { error: '' }

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS_ERROR:
      return {
        ...state,
        error: action?.payload
      }
    default: return state
  }
}

export default errorsReducer

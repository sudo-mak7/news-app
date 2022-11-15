import { SET_CURRENT_NEWS_ID } from '../constants'

const initialState = { id: null }

const newsIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_NEWS_ID:
      return {
        ...state,
        id: action?.payload
      }
    default: return state
  }
}

export default newsIdReducer

import { SET_CURRENT_NEWS } from '../constants'

const initialState = { news: JSON.parse(localStorage.getItem('currentNews')) }

const currentNewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_NEWS:
      return {
        ...state,
        news: action?.payload
      }
    default: return state
  }
}

export default currentNewsReducer

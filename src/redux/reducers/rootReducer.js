import { combineReducers } from 'redux'
import newsReducer from './newsReducer'
import loaderReducer from './loaderReducer'
import newsIdReducer from './newsIdReducer'
import currentNewsReducer from './currentNewsReducer'
import commentsReducer from './commentsReducer'

const rootReducer = combineReducers({
  newsReducer,
  newsIdReducer,
  currentNewsReducer,
  commentsReducer,
  loaderReducer
})

export default rootReducer

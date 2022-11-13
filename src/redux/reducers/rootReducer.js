import { combineReducers } from 'redux'
import newsReducer from './newsReducer'
import errorsReducer from './errorsReducer'
import loaderReducer from './loaderReducer'

const rootReducer = combineReducers({
  newsReducer,
  errorsReducer,
  loaderReducer
})

export default rootReducer

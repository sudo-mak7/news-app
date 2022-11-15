import { legacy_createStore as createStore } from 'redux'
import rootReducer from './reducers/rootReducer'

const configureStore = (preloadedState) => createStore(
  rootReducer,
  preloadedState
)

const store = configureStore({})

export default store

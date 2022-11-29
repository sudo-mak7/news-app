import { configureStore  } from '@reduxjs/toolkit'
import newsReducer from './news/newsSlice'
import loadingReducer from './loading/loadingSlice'
import currentNewsReducer from './news/currentNewsSlice'
import newsIdReducer from './news/newsIdSlice'
import commentsReducer from './comments/commentsSlice'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    loading: loadingReducer,
    currentNews: currentNewsReducer,
    setCurrentNewsId: newsIdReducer,
    setComments: commentsReducer
  }
})

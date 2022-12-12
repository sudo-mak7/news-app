import { configureStore  } from '@reduxjs/toolkit'
import newsIdsReducer from '@redux/news/newsIdsSlice'
import newsReducer from '@redux/news/newsSlice'
import currentNewsReducer from '@redux/news/currentNewsSlice'
import newsIdReducer from '@redux/news/newsByIdSlice'
import commentsReducer from '@redux/comments/commentsSlice'
import paginationReducer from '@redux/pagination/paginationSlice'

export const store = configureStore({
  reducer: {
    newsIds: newsIdsReducer,
    clearNewsIds: newsIdsReducer,

    news: newsReducer,
    currentNews: currentNewsReducer,

    setCurrentNewsId: newsIdReducer,

    setComments: commentsReducer,
    clearComments: commentsReducer,

    setCurrentPageNumber:  paginationReducer,
    setCurrentPageNews: paginationReducer,
    setPagesLeft: paginationReducer,
    clearPaginationState: paginationReducer
  }
})

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewsInterface } from '@common/types/newsInterface'
import { PaginationStateInterface } from '@redux/types'

const initialState = {
  currentPage: -1,
  currentPageNews: [],
  pagesLeft: null
} as PaginationStateInterface

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPageNumber: (state) => {
      state.currentPage =
        state.pagesLeft >= state.currentPage
          ? state.currentPage + 1
          : state.currentPage
    },
    setCurrentPageNews: (state, action: PayloadAction<NewsInterface[]>) => {
      state.currentPageNews =
        !state.currentPageNews.length
          ? action.payload
          : [...state.currentPageNews, ...action.payload]
    },
    setPagesLeft: (state, action: PayloadAction<number>) => {
      state.pagesLeft = action.payload
    },
    clearPaginationState: (state) => {
      state.currentPage = -1
      state.currentPageNews = []
      state.pagesLeft = null
    }
  }
})

export const {
  setCurrentPageNumber,
  setCurrentPageNews,
  setPagesLeft,
  clearPaginationState
} = paginationSlice.actions

export default paginationSlice.reducer
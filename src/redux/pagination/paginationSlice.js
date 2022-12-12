import { createSlice } from '@reduxjs/toolkit'

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: -1,
    currentPageNews: [],
    pagesLeft: null
  },
  reducers: {
    setCurrentPageNumber: (state) => {
      state.currentPage =
        state.pagesLeft >= state.currentPage
          ? state.currentPage + 1
          : state.currentPage
    },
    setCurrentPageNews: (state, action) => {
      state.currentPageNews =
        !state.currentPageNews.length
          ? action.payload
          : [...state.currentPageNews, ...action.payload]
    },
    setPagesLeft: (state, action) => {
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
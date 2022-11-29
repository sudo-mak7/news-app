import { createSlice } from '@reduxjs/toolkit'

export const currentNewsSlice = createSlice({
  name: 'currentNews',
  initialState: {
    currentNews: JSON.parse(localStorage.getItem('currentNews'))
  },
  reducers: {
    setCurrentNews: (state, action) => {
      state.currentNews = action?.payload
    }
  }
})

export const { setCurrentNews } = currentNewsSlice.actions

export default currentNewsSlice.reducer
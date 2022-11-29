import { createSlice } from '@reduxjs/toolkit'

export const newsIdSlice = createSlice({
  name: 'newsId',
  initialState: {
    id: null
  },
  reducers: {
    setCurrentNewsId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { setCurrentNewsId } = newsIdSlice.actions

export default newsIdSlice.reducer
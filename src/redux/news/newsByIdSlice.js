import { createSlice } from '@reduxjs/toolkit'

export const newsByIdSlice = createSlice({
  name: 'newsById',
  initialState: {
    id: JSON.parse(localStorage.getItem('currentNewsId')) || null
  },
  reducers: {
    setCurrentNewsId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { setCurrentNewsId } = newsByIdSlice.actions

export default newsByIdSlice.reducer
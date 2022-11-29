import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false
  },
  reducers: {
    loading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const { loading } = loadingSlice.actions

export default loadingSlice.reducer
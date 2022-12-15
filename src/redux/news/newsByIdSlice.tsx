import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NewsByIdState {
  id: number
}

const initialState = {
  id: JSON.parse(localStorage.getItem('currentNewsId')) || null
} as NewsByIdState

export const newsByIdSlice = createSlice({
  name: 'newsById',
  initialState,
  reducers: {
    setCurrentNewsId: (state, action: PayloadAction<any>) => {
      state.id = action.payload
    }
  }
})

export const { setCurrentNewsId } = newsByIdSlice.actions

export default newsByIdSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getItemFromApiWithUrlById } from '@api/url'
import { fetchComments } from '@redux/comments/commentsSlice'

export const fetchCurrentNewsById = createAsyncThunk(
  'currentNews/fetchCurrentNewsById',
  async (id, { rejectWithValue , dispatch }) => {
    try {
      const response = await fetch(getItemFromApiWithUrlById(id))

      if (!response.ok) {
        throw new Error('Server Error!')
      } else {
        const currNews = await response.json()
        dispatch(currentNews(currNews))
        dispatch(fetchComments(currNews.kids))
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const currentNewsSlice = createSlice({
  name: 'currentNews',
  initialState: {
    currentNews: [],
    loading: false,
    error: null
  },
  reducers: {
    currentNews: (state, action) => {
      state.currentNews = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentNewsById.pending, (state) => {
      state.loading = true
      state.error = null
    })
      .addCase(fetchCurrentNewsById.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(fetchCurrentNewsById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { currentNews } = currentNewsSlice.actions

export default currentNewsSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getItemFromApiWithUrlById } from '@api/url'

export const fetchNewsByIds = createAsyncThunk(
  'news/fetchNewsByIds',
  async (ids, { rejectWithValue , dispatch }) => {
    const news = []

    for (let i = 0; i < ids.length; i++) {
      try {
        const response = await fetch(getItemFromApiWithUrlById(ids[i]))

        if (!response.ok) {
          throw new Error('Server Error!')
        } else {
          news.push(await response.json())
        }
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }
    dispatch(setNews(news))
  }
)

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    loading: false,
    error: null
  },
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload
    },
    clearNews: (state) => {
      state.news = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsByIds.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchNewsByIds.fulfilled, (state) => {
      state.loading = false
    })
    .addCase(fetchNewsByIds.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { setNews, clearNews } = newsSlice.actions

export default newsSlice.reducer
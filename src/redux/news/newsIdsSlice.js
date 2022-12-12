import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { newsApiUrl } from '@api/url'
import { getPaginatedNewsIds } from '@utils/getPaginatedNewsIds'
import { fetchNewsByIds } from '@redux/news/newsSlice'

export const fetchNewsIds = createAsyncThunk(
  'newsIds/fetchNewsIds',
  async (_, { rejectWithValue , dispatch }) => {
    try {
      const response = await fetch(newsApiUrl)

      if (!response.ok) {
        throw new Error('Server Error!')
      } else {
        const loadedNewsIds = await response.json()
        const paginatedNewsIds = getPaginatedNewsIds(loadedNewsIds)
        dispatch(setNewsIds(paginatedNewsIds))
        dispatch(fetchNewsByIds(paginatedNewsIds[0]))
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const newsIdsSlice = createSlice({
  name: 'newsIds',
  initialState: {
    newsIds: [],
    loading: false,
    error: null
  },
  reducers: {
    setNewsIds: (state, action) => {
      state.newsIds = action.payload
    },
    clearNewsIds: (state) => {
      state.newsIds = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewsIds.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchNewsIds.fulfilled, (state) => {
      state.loading = false
    })
    .addCase(fetchNewsIds.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { setNewsIds, clearNewsIds } = newsIdsSlice.actions

export default newsIdsSlice.reducer
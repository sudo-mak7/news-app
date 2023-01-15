import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { paths } from '@api/url'
import { getPaginatedNewsIds } from '@utils/getPaginatedNewsIds'
import { fetchNewsByIds } from '@redux/news/newsSlice'
import { NewsIdsStateInterface } from '@redux/types'
import {ERROR_LOADING_NEWS_MESSAGE} from "@common/messages/errors";

export const fetchNewsIds = createAsyncThunk(
  'newsIds/fetchNewsIds',
  async (_, { rejectWithValue , dispatch }) => {
    try {
      const response = await fetch(paths.newsApiUrl())

      if (!response.ok) {
        console.warn(ERROR_LOADING_NEWS_MESSAGE)
        throw new Error(ERROR_LOADING_NEWS_MESSAGE)
      } else {
        const loadedNewsIds: number[] = await response.json()
        const paginatedNewsIds: [number][] = getPaginatedNewsIds(loadedNewsIds)
        dispatch(setNewsIds(paginatedNewsIds))
        dispatch(fetchNewsByIds(paginatedNewsIds[0]))
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  newsIds: [],
  loading: false,
  error: null
} as NewsIdsStateInterface

export const newsIdsSlice = createSlice({
  name: 'newsIds',
  initialState,
  reducers: {
    setNewsIds: (state, action: PayloadAction<[number][]>) => {
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
    .addCase(fetchNewsIds.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { setNewsIds, clearNewsIds } = newsIdsSlice.actions

export default newsIdsSlice.reducer
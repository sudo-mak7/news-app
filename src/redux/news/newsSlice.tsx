import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItemFromApiWithUrlById } from '@api/url'
import { NewsInterface } from '@common/types/newsInterface'
import { NewsStateInterface } from '@redux/types'
import {ERROR_LOADING_NEWS_MESSAGE} from "@common/messages/errors";

export const fetchNewsByIds = createAsyncThunk(
  'news/fetchNewsByIds',
  async (ids: number[], { rejectWithValue , dispatch }) => {
    const news = []

    for (let i = 0; i < ids.length; i++) {
      try {
        const response = await fetch(getItemFromApiWithUrlById(ids[i]))

        if (!response.ok) {
          console.warn(ERROR_LOADING_NEWS_MESSAGE)
          throw new Error(ERROR_LOADING_NEWS_MESSAGE)
        } else {
          news.push(await response.json())
        }
      } catch (error: any) {
        return rejectWithValue(error.message)
      }
    }
    dispatch(setNews(news))
  }
)

const initialState = {
  news: [],
  loading: false,
  error: null
} as NewsStateInterface

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<NewsInterface[]>) => {
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
    .addCase(fetchNewsByIds.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { setNews, clearNews } = newsSlice.actions

export default newsSlice.reducer
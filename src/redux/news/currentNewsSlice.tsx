import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItemFromApiWithUrlById } from '@api/url'
import { fetchComments } from '@redux/comments/commentsSlice'
import { NewsInterface } from '@common/types/newsInterface'
import { CurrentNewsStateInterface } from '@redux/types'
import {ERROR_LOADING_CURRENT_NEWS_MESSAGE} from "@common/messages/errors";

export const fetchCurrentNewsById = createAsyncThunk(
  'currentNews/fetchCurrentNewsById',
  async (id: number, { rejectWithValue , dispatch }) => {
    try {
      const response = await fetch(getItemFromApiWithUrlById(id))

      if (!response.ok) {
        console.warn(ERROR_LOADING_CURRENT_NEWS_MESSAGE)
        throw new Error(ERROR_LOADING_CURRENT_NEWS_MESSAGE)
      } else {
        const currNews = await response.json()
        dispatch(currentNews(currNews))
        dispatch(fetchComments(currNews.kids))
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  currentNews: {},
  loading: false,
  error: null
} as CurrentNewsStateInterface

export const currentNewsSlice = createSlice({
  name: 'currentNews',
  initialState,
  reducers: {
    currentNews: (state, action: PayloadAction<NewsInterface>) => {
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
      .addCase(fetchCurrentNewsById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { currentNews } = currentNewsSlice.actions

export default currentNewsSlice.reducer
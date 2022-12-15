import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItemFromApiWithUrlById } from '@api/url'
import { NewsInterface } from '@common-types/newsInterface'

export const fetchNewsByIds = createAsyncThunk(
  'news/fetchNewsByIds',
  async (ids: number[], { rejectWithValue , dispatch }) => {
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

interface NewsState {
  news: NewsInterface[],
  loading: boolean,
  error: any
}

const initialState = {
  news: [],
  loading: false,
  error: null
} as NewsState

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
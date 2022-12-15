import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItemFromApiWithUrlById } from '@api/url'
import { CommentsInterface } from '@common-types/commentsInterface'
import { CommentsStateInterface } from '@redux/types'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (ids: number[], { rejectWithValue, dispatch }) => {
    const comments = []

    for (let i = 0; i < ids.length; i++) {
      try {
        const response = await fetch(getItemFromApiWithUrlById(ids[i]))

        if (!response.ok) {
          console.warn('Server Error!')
        } else {
          const commentsLoaded = await response.json()
          comments.push(commentsLoaded)
        }
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }

    dispatch(setComments(comments))
  }
)

const initialState = {
  comments: [],
  loading: false,
  error: null
} as CommentsStateInterface

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentsInterface[]>) => {
      state.comments = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true
      state.error = null
    })
      .addCase(fetchComments.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(fetchComments.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
      })
  }
})

export const { setComments } = commentsSlice.actions

export default commentsSlice.reducer
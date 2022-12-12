import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getItemFromApiWithUrlById } from '@api/url'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (ids, { rejectWithValue, dispatch }) => {
    const comments = []

    for (let i = 0; i < ids.length; i++) {
      try {
        const response = await fetch(getItemFromApiWithUrlById(ids[i]))

        if (!response.ok) {
          throw new Error('Server Error!')
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

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null
  },
  reducers: {
    setComments: (state, action) => {
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
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export const { setComments } = commentsSlice.actions

export default commentsSlice.reducer
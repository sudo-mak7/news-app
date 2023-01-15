import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getItemFromApiWithUrlById } from '@api/url'
import { fetchAnswersInterface } from '@redux/types'
import { ERROR_LOADING_ANSWERS_MESSAGE } from '@common/messages/errors'

export const fetchAnswers = createAsyncThunk(
  'comments/fetchAnswers',
  async ({
           id,
           setAnswersState,
           setIsLoading,
           setError
  }: fetchAnswersInterface, _) => {
    setIsLoading(true)

    const response = await fetch(getItemFromApiWithUrlById(id))

    if (!response.ok) {
      setError(response)
      console.warn(ERROR_LOADING_ANSWERS_MESSAGE)
      throw new Error(ERROR_LOADING_ANSWERS_MESSAGE)
    } else {
      const comments = await response.json()
      const ids = comments?.kids

      const answers = []

      for (let i = 0; i < ids.length; i++) {
        const response = await fetch(getItemFromApiWithUrlById(ids[i]))

        if (!response.ok) {
          setError(response)
          console.warn(ERROR_LOADING_ANSWERS_MESSAGE)
          throw new Error(ERROR_LOADING_ANSWERS_MESSAGE)
        } else {
          const currentAnswer = await response.json()
          answers.push(currentAnswer)
        }
      }
      setAnswersState(answers)
      setIsLoading(false)
    }
  }
)

export const answersSlice = createSlice({
  name: 'answers',
  initialState: {},
  reducers: {},
  extraReducers: {}
})

export default answersSlice.reducer
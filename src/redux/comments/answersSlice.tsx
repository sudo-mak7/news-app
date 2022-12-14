import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getItemFromApiWithUrlById } from '@api/url'
import { fetchAnswersInterface } from '@redux/types'

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
      console.warn('Server Error!')
    } else {
      const comments = await response.json()
      const ids = comments?.kids

      const answers = []

      for (let i = 0; i < ids.length; i++) {
        const response = await fetch(getItemFromApiWithUrlById(ids[i]))

        if (!response.ok) {
          setError(response)
          console.warn('Server Error!')
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
  initialState: undefined,
  reducers: undefined,
  extraReducers: undefined
})

export default answersSlice.reducer
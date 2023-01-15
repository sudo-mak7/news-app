import { NewsByIdStateInterface } from '@redux/types'
import { newsByIdSlice, setCurrentNewsId } from '@redux/news/newsByIdSlice'

const initialStateId = {
  id: 8863
} as NewsByIdStateInterface

const initialStateNull = {
  id: null
} as NewsByIdStateInterface

const newsByIdReducer = newsByIdSlice.reducer

describe('newsByIdSlice test', () => {
  test('should set current news with correct id with setCurrentNewsId', () => {
    const state = newsByIdReducer(initialStateId, setCurrentNewsId(initialStateId.id))
    expect(state.id).toBe(8863)
  })

  test('should set current news with null id with setCurrentNewsId', () => {
    const state = newsByIdReducer(initialStateNull, setCurrentNewsId(initialStateNull.id))
    expect(state.id).toBeNull()
  })
})
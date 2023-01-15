import { clearNewsIds, fetchNewsIds, newsIdsSlice } from '@redux/news/newsIdsSlice'
import { NewsIdsStateInterface } from '@redux/types'

const initialState = {
  newsIds: [],
  loading: false,
  error: null
} as NewsIdsStateInterface

const newsIdsReducer = newsIdsSlice.reducer

const actionTypeSetNewsIds = 'newsIds/setNewsIds'

describe('newsIdsSlice test', () => {
  test('dispatch should be called', async () => {
    const dispatch = jest.fn()
    const thunk = fetchNewsIds()

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(dispatch).toHaveBeenCalledTimes(calls.length)
  })

  test('fetchNewsIds with resolved response', async () => {
    const dispatch = jest.fn()
    const thunk = fetchNewsIds()

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(4)

    const [start, action, fn, end] = calls

    expect(start[0].type).toBe(fetchNewsIds.pending.type)
    expect(action[0].type).toBe(actionTypeSetNewsIds)
    expect(action[0].payload).not.toEqual([])
    expect(end[0].type).toBe(fetchNewsIds.fulfilled.type)
  })

  test('should change loading status with "fetchNewsIds.pending" action', () => {
    const state = newsIdsReducer(initialState, fetchNewsIds.pending)
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  test('should change loading status with "fetchCurrentNewsById.fulfilled" action', () => {
    const state = newsIdsReducer(initialState, fetchNewsIds.fulfilled)
    expect(state.loading).toBe(false)
  })

  test('should change loading status with "fetchNewsIds.rejected" action', async () => {
    const state = newsIdsReducer(initialState, fetchNewsIds.rejected)
    expect(state.newsIds).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).not.toBeNull()
  })

  test('should clear newsIds with clearNewsIds', async () => {
    const state = newsIdsReducer(initialState, clearNewsIds())
    expect(state.newsIds).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
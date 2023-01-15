import { commentsSlice, fetchComments } from '@redux/comments/commentsSlice'
import { CommentsStateInterface } from '@redux/types'

const initialState = {
  comments: [],
  loading: false,
  error: null
} as CommentsStateInterface

const commentsReducer = commentsSlice.reducer

const mockComments = {
  'by': 'norvig',
  'id': 2921983,
  'parent': 2921506,
  'time': 1314211127,
  'type': 'comment'
}

const actionType = 'comments/setComments'

describe('fetchComments test', () => {
  test('dispatch should be called', async () => {
    const dispatch = jest.fn()
    const thunk = fetchComments([2921983])

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(dispatch).toHaveBeenCalledTimes(calls.length)
  })

  test('fetchComments with resolved response', async () => {
    const dispatch = jest.fn()
    const thunk = fetchComments([2921983])

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(3)

    const [start, action, end] = calls

    expect(start[0].type).toBe(fetchComments.pending.type)

    expect(action[0].type).toBe(actionType)
    expect(action[0].payload[0].by).toBe(mockComments.by)
    expect(action[0].payload[0].id).toBe(mockComments.id)
    expect(action[0].payload[0].parent).toBe(mockComments.parent)
    expect(action[0].payload[0].time).toBe(mockComments.time)
    expect(action[0].payload[0].type).toBe(mockComments.type)

    expect(end[0].type).toBe(fetchComments.fulfilled.type)
  })

  test('fetchComments with rejected response', async () => {
    const dispatch = jest.fn()
    const thunk = fetchComments([0.5])

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)

    const [start, end] = calls

    expect(start[0].type).toBe(fetchComments.pending.type)

    expect(end[0].type).toBe(fetchComments.rejected.type)
    expect(end[0].meta.rejectedWithValue).toBe(true)
  })

  test('should change loading status with "fetchComments.pending" action', () => {
    const state = commentsReducer(initialState, fetchComments.pending)
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  test('should change loading status with "fetchComments.fulfilled" action', () => {
    const state = commentsReducer(initialState, fetchComments.fulfilled)
    expect(state.loading).toBe(false)
  })

  test('should change loading status with "fetchComments.rejected" action', async () => {
    const dispatch = jest.fn()
    const thunk = fetchComments([0.5])

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)

    const [start, end] = calls

    const state = commentsReducer(initialState, fetchComments.rejected)

    expect(state.loading).toBe(false)
    expect(end[0].meta.rejectedWithValue).toBe(true)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
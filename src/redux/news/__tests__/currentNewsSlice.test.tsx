import { currentNewsSlice, fetchCurrentNewsById } from '@redux/news/currentNewsSlice'
import { CurrentNewsStateInterface } from '@redux/types'

const initialState = {
  currentNews: {},
  loading: false,
  error: null
} as CurrentNewsStateInterface

const currentNewsReducer = currentNewsSlice.reducer

const mockNews = {
  'by': 'dhouston',
  'descendants': 71,
  'id': 8863,
  'time': 1175714200,
  'title': 'My YC app: Dropbox - Throw away your USB drive',
  'type': 'story',
  'url': 'http://www.getdropbox.com/u/2/screencast.html'
}

const actionType = 'currentNews/currentNews'

describe('currentNewsSlice test', () => {
  test('dispatch should be called', async () => {
    const dispatch = jest.fn()
    const thunk = fetchCurrentNewsById(8863)

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(dispatch).toHaveBeenCalledTimes(calls.length)
  })

  test('fetchCurrentNewsById with resolved response', async () => {
    const dispatch = jest.fn()
    const thunk = fetchCurrentNewsById(8863)

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(4)

    const [start, action, fn, end] = calls

    expect(start[0].type).toBe(fetchCurrentNewsById.pending.type)

    expect(action[0].type).toBe(actionType)
    expect(action[0].payload.by).toBe(mockNews.by)
    expect(action[0].payload.descendants).toBe(mockNews.descendants)
    expect(action[0].payload.id).toBe(mockNews.id)
    expect(action[0].payload.time).toBe(mockNews.time)
    expect(action[0].payload.title).toBe(mockNews.title)
    expect(action[0].payload.type).toBe(mockNews.type)
    expect(action[0].payload.url).toBe(mockNews.url)

    expect(end[0].type).toBe(fetchCurrentNewsById.fulfilled.type)
  })

  test('fetchCurrentNewsById with rejected response', async () => {
    const dispatch = jest.fn()
    const thunk = fetchCurrentNewsById(null)

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(3)

    const [start, action, end] = calls

    expect(start[0].type).toBe(fetchCurrentNewsById.pending.type)
    expect(action[0].type).toBe(actionType)
    expect(end[0].type).toBe(fetchCurrentNewsById.rejected.type)
    expect(end[0].meta.rejectedWithValue).toBeTruthy()
  })

  test('should change loading status with "fetchCurrentNewsById.pending" action', () => {
    const state = currentNewsReducer(initialState, fetchCurrentNewsById.pending)
    expect(state.loading).toBeTruthy()
    expect(state.error).toBeNull()
  })

  test('should change loading status with "fetchCurrentNewsById.fulfilled" action', () => {
    const state = currentNewsReducer(initialState, fetchCurrentNewsById.fulfilled)
    expect(state.loading).toBeFalsy()
  })

  test('should change loading status with "fetchCurrentNewsById.rejected" action', async () => {
    const dispatch = jest.fn()
    const thunk = fetchCurrentNewsById(null)

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(3)

    const [start, action, end] = calls

    const state = currentNewsReducer(initialState, fetchCurrentNewsById.rejected)

    expect(state.loading).toBeFalsy()
    expect(end[0].meta.rejectedWithValue).toBeTruthy()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
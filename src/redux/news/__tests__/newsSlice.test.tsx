import { clearNews, fetchNewsByIds, newsSlice } from '@redux/news/newsSlice'
import { NewsStateInterface } from '@redux/types'

const initialState = {
  news: [],
  loading: false,
  error: null
} as NewsStateInterface

const newsReducer = newsSlice.reducer

const mockNews = {
  'by': 'dhouston',
  'descendants': 71,
  'id': 8863,
  'time': 1175714200,
  'title': 'My YC app: Dropbox - Throw away your USB drive',
  'type': 'story',
  'url': 'http://www.getdropbox.com/u/2/screencast.html'
}

const actionType = 'news/setNews'

describe('fetchNewsByIds test', () => {
  test('dispatch should be called', async () => {
    const dispatch = jest.fn()
    const thunk = fetchNewsByIds([8863])

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(dispatch).toHaveBeenCalledTimes(calls.length)
  })

  test('fetchNewsByIds with resolved response', async () => {
    const dispatch = jest.fn()
    const thunk = fetchNewsByIds([8863])

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(3)

    const [start, action, end] = calls

    expect(start[0].type).toBe(fetchNewsByIds.pending.type)

    expect(action[0].type).toBe(actionType)
    expect(action[0].payload[0].by).toBe(mockNews.by)
    expect(action[0].payload[0].descendants).toBe(mockNews.descendants)
    expect(action[0].payload[0].id).toBe(mockNews.id)
    expect(action[0].payload[0].time).toBe(mockNews.time)
    expect(action[0].payload[0].title).toBe(mockNews.title)
    expect(action[0].payload[0].type).toBe(mockNews.type)
    expect(action[0].payload[0].url).toBe(mockNews.url)

    expect(end[0].type).toBe(fetchNewsByIds.fulfilled.type)
  })

  test('fetchNewsByIds with rejected response', async () => {
    const dispatch = jest.fn()
    const thunk = fetchNewsByIds([0.5])

    await thunk(dispatch, () => ({}), () => ({}))
    const { calls } = dispatch.mock

    expect(calls).toHaveLength(2)

    const [start, end] = calls

    expect(start[0].type).toBe(fetchNewsByIds.pending.type)
    expect(end[0].type).toBe(fetchNewsByIds.rejected.type)
    expect(end[0].meta.rejectedWithValue).toBeTruthy()
  })

  test('should change loading status with "fetchNewsByIds.pending" action', () => {
    const state = newsReducer(initialState, fetchNewsByIds.pending)
    expect(state.loading).toBeTruthy()
    expect(state.error).toBeNull()
  })

  test('should change loading status with "fetchNewsByIds.fulfilled" action', () => {
    const state = newsReducer(initialState, fetchNewsByIds.fulfilled)
    expect(state.loading).toBeFalsy()
  })

  test('should change loading status with "fetchNewsByIds.rejected" action', () => {
    const state = newsReducer(initialState, fetchNewsByIds.rejected)
    expect(state.loading).toBeFalsy()
    expect(state.error).not.toBeNull()
  })

  test('should clear news with clearNews', () => {
    const state = newsReducer(initialState, clearNews())
    expect(state.news).toEqual([])
    expect(state.loading).toBeFalsy()
    expect(state.error).toBeNull()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
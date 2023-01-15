import { PaginationStateInterface } from '@redux/types'
import {
  clearPaginationState,
  paginationSlice,
  setCurrentPageNews,
  setCurrentPageNumber,
  setPagesLeft
} from '@redux/pagination/paginationSlice'

const initialState = {
  currentPage: 0,
  currentPageNews: [],
  pagesLeft: null
} as PaginationStateInterface

const paginationReducer = paginationSlice.reducer

const mockNews = [{
  'by': 'dhouston',
  'descendants': 71,
  'id': 8863,
  'time': 1175714200,
  'title': 'My YC app: Dropbox - Throw away your USB drive',
  'type': 'story',
  'url': 'http://www.getdropbox.com/u/2/screencast.html'
}]

describe('paginationSlice test', () => {
  test('should set current page number with setCurrentPageNumber', () => {
    const state = paginationReducer(initialState, setCurrentPageNumber())
    expect(state.currentPage).toBe(1)
  })

  test('should set current page news with setCurrentPageNews', () => {
    const state = paginationReducer(initialState, setCurrentPageNews(mockNews))

    expect(state.currentPageNews[0].by).toBe(mockNews[0].by)
    expect(state.currentPageNews[0].descendants).toBe(mockNews[0].descendants)
    expect(state.currentPageNews[0].id).toBe(mockNews[0].id)
    expect(state.currentPageNews[0].time).toBe(mockNews[0].time)
    expect(state.currentPageNews[0].title).toBe(mockNews[0].title)
    expect(state.currentPageNews[0].type).toBe(mockNews[0].type)
    expect(state.currentPageNews[0].url).toBe(mockNews[0].url)
  })

  test('should set pages left with setPagesLeft', () => {
    const state = paginationReducer(initialState, setPagesLeft(42))
    expect(state.pagesLeft).toBe(42)
  })

  test('should set pages left with setPagesLeft and null', () => {
    const state = paginationReducer(initialState, setPagesLeft(null))
    expect(state.pagesLeft).toBeNull()
  })

  test('should clear pagination state with clearPaginationState', () => {
    const state = paginationReducer(initialState, clearPaginationState())
    expect(state.currentPage).toBe(0)
    expect(state.currentPageNews).toEqual([])
    expect(state.pagesLeft).toBeNull()
  })
})
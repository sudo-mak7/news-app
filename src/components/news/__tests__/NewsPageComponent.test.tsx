import * as React from 'react'
import * as reduxHooks from '@redux/reduxHooks'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { currentNewsSlice, fetchCurrentNewsById } from '@redux/news/currentNewsSlice'
import NewsPageComponent from '@components/news/NewsPageComponent'
import { CurrentNewsStateInterface } from '@redux/types'

const initialState = {
  currentNews: {},
  loading: false,
  error: null
} as CurrentNewsStateInterface

const currentNewsSliceReducer = currentNewsSlice.reducer

const newsPageComponent = (): JSX.Element =>
  <Provider store = { store } >
    <NewsPageComponent />
  </Provider>

const mockedDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')

describe('NewsPageComponent test', () => {
  test('NewsPageComponent should to match snapshot', () => {
    window.scrollTo = jest.fn()

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(newsPageComponent())
    expect(newsPageComponent()).toMatchSnapshot()
  })

  test('renders NewsPageComponent update comments button with completed loading', () => {
    window.scrollTo = jest.fn()

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    const state = currentNewsSliceReducer(initialState, fetchCurrentNewsById.fulfilled)
    expect(state.loading).toBe(false)

    render(newsPageComponent())

    const buttonInNewsPageComponent = screen.getByRole('button')
    expect(buttonInNewsPageComponent).toHaveTextContent(/update comments/i)
  })

  test('renders NewsPageComponent with no data', () => {
    window.scrollTo = jest.fn()

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    const state = currentNewsSliceReducer(initialState, fetchCurrentNewsById.fulfilled)
    expect(state.loading).toBe(false)

    render(newsPageComponent())

    const newsInNewsPageComponent = screen.getByTestId('news')
    expect(newsInNewsPageComponent).toBeInTheDocument()

    const titleInNewsPageComponent = screen.getByText(/no title/i)
    expect(titleInNewsPageComponent).toBeInTheDocument()

    const authorInNewsPageComponent = screen.getByText(/no author/i)
    expect(authorInNewsPageComponent).toBeInTheDocument()

    const commentsInNewsPageComponent = screen.getByText(/no comments yet/i)
    expect(commentsInNewsPageComponent).toBeInTheDocument()

    const dateInNewsPageComponent = screen.getByText(/no date/i)
    expect(dateInNewsPageComponent).toBeInTheDocument()
  })

  test('dispatch should called once by click', () => {
    window.scrollTo = jest.fn()

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(newsPageComponent())
    const buttonInNewsPageComponent = screen.getByRole('button')

    fireEvent.click(buttonInNewsPageComponent)
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

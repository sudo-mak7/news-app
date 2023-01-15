import * as React from 'react'
import * as reduxHooks from '@redux/reduxHooks'
import { screen, render } from '@testing-library/react'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import MainPage from '@pages/main/MainPage'

const mainPage = (): JSX.Element =>
  <Provider store = { store } >
    <MainPage />
  </Provider>

const mockedDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')

describe('MainPage test', () => {
  test('MainPage should to match snapshot', () => {
    window.scrollTo = jest.fn()

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(mainPage())
    expect(mainPage()).toMatchSnapshot()
  })

  test('renders MainPage ButtonUpdateNewsComponent', () => {
    window.scrollTo = jest.fn()

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(mainPage())

    const buttonInMainPage = screen.getByRole('button')
    expect(buttonInMainPage).toHaveClass('ui blue big icon button')
  })

  test('renders MainPage container', () => {
    window.scrollTo = jest.fn()

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(mainPage())

    const buttonInMainPage = screen.getByTestId('container')
    expect(buttonInMainPage).toBeInTheDocument()
  })

  test('dispatch should called once', () => {
    window.scrollTo = jest.fn()

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(mainPage())

    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
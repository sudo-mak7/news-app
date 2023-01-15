import * as React from 'react'
import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import CurrentNewsPage from '@pages/news/currentNewsPage'

const currentNewsPage = (): JSX.Element =>
  <Provider store = { store } >
    <BrowserRouter>
      <CurrentNewsPage />
    </BrowserRouter>
  </Provider>

describe('CurrentNewsPage test', () => {
  test('CurrentNewsPage should to match snapshot', () => {
    window.scrollTo = jest.fn()

    render(currentNewsPage())
    expect(currentNewsPage()).toMatchSnapshot()
  })

  test('renders CurrentNewsPage ButtonBackToNewsComponent', () => {
    window.scrollTo = jest.fn()

    render(currentNewsPage())

    const buttonInCurrentNewsPage = screen.getByRole('button')
    expect(buttonInCurrentNewsPage).toBeInTheDocument()
    expect(buttonInCurrentNewsPage).toHaveClass('ui blue big icon button')
  })

  test('renders CurrentNewsPage news block', () => {
    window.scrollTo = jest.fn()

    render(currentNewsPage())

    const articleInCurrentNewsPage = screen.getByRole('article')
    expect(articleInCurrentNewsPage).toBeInTheDocument()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})

import * as React from 'react'
import * as reduxHooks from '@redux/reduxHooks'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import MainPageNewsSectionComponent from '@components/news/MainPageNewsSectionComponent'
import { NewsInterface } from '@common/types/newsInterface'

const mainPageNewsSectionComponent = (
  { title, by, score, time, id }: NewsInterface
): JSX.Element =>
  <Provider store = { store } >
    <BrowserRouter>
      <MainPageNewsSectionComponent
        title={ title }
        by={ by }
        score={ score }
        time={ time }
        id={ id }
      />
    </BrowserRouter>
  </Provider>

const mockedDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')

describe('MainPageNewsSectionComponent test', () => {
  test('MainPageNewsSectionComponent should to match snapshot', () => {
    const props = {
      title: 'News title',
      by: 'author',
      score: 111,
      time: 1175714200,
      id: 8863
    }

    render(mainPageNewsSectionComponent(props))
    expect(mainPageNewsSectionComponent(props)).toMatchSnapshot()
  })

  test('renders MainPageNewsSectionComponent with data', () => {
    const props = {
      title: 'News title',
      by: 'author',
      score: 111,
      time: 1175714200,
      id: 8863
    }

    render(mainPageNewsSectionComponent(props))

    const newsInMainPageNewsSectionComponent = screen.getByTestId('news')
    expect(newsInMainPageNewsSectionComponent).toBeInTheDocument()
  })

  test('renders MainPageNewsSectionComponent with no data', () => {
    const props = {
      title: null,
      by: null,
      score: null,
      time: null,
      id: null
    }

    render(mainPageNewsSectionComponent(props))

    const titleInMainPageNewsSectionComponent = screen.getByText(/no title/i)
    expect(titleInMainPageNewsSectionComponent).toBeInTheDocument()

    const authorInMainPageNewsSectionComponent = screen.getByText(/no author/i)
    expect(authorInMainPageNewsSectionComponent).toBeInTheDocument()

    const ratingInMainPageNewsSectionComponent = screen.getByText(/no rating/i)
    expect(ratingInMainPageNewsSectionComponent).toBeInTheDocument()

    const dateInMainPageNewsSectionComponent = screen.getByText(/no date/i)
    expect(dateInMainPageNewsSectionComponent).toBeInTheDocument()
  })

  test('dispatch should called once by click', () => {
    const props = {
      title: 'News title',
      by: 'author',
      score: 111,
      time: 1175714200,
      id: 8863
    }

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(mainPageNewsSectionComponent(props))
    const newsInMainPageNewsSectionComponent = screen.getByTestId('news')

    fireEvent.click(newsInMainPageNewsSectionComponent)
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
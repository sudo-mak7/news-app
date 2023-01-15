import * as React from 'react'
import * as reduxHooks from '@redux/reduxHooks'
import { render, screen, fireEvent } from '@testing-library/react'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import ButtonUpdateNewsComponent from '@components/ui/ButtonUpdateNewsComponent'

const buttonUpdateNewsComponent = (): JSX.Element =>
  <Provider store={ store }>
    <ButtonUpdateNewsComponent />
  </Provider>

const mockedDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')

describe('ButtonUpdateNewsComponent test', () => {
  test('renders ButtonUpdateNewsComponent', () => {
    render(buttonUpdateNewsComponent())
    expect(buttonUpdateNewsComponent()).toMatchSnapshot()

    const buttonInButtonUpdateNewsComponent = screen.getByRole('button')
    expect(buttonInButtonUpdateNewsComponent).toHaveClass('ui blue big icon button')
  })

  test('dispatch should called 4 times by click', () => {
    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(buttonUpdateNewsComponent())
    const buttonInButtonUpdateNewsComponent = screen.getByRole('button')

    fireEvent.click(buttonInButtonUpdateNewsComponent)
    expect(dispatch).toHaveBeenCalledTimes(4)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
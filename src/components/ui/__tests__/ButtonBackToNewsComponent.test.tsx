import * as React from 'react'
import * as routerHooks from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import ButtonBackToNewsComponent from '@components/ui/ButtonBackToNewsComponent'

const buttonBackToNewsComponent = (): JSX.Element =>
  <BrowserRouter>
    <ButtonBackToNewsComponent />
  </BrowserRouter>

jest.mock(
  'react-router-dom',
  () => ({
    __esModule: true, ...jest.requireActual('react-router-dom')
  })
)

const mockedNavigate = jest.spyOn(routerHooks, 'useNavigate')

describe('ButtonBackToNewsComponent test', () => {
  test('renders ButtonBackToNewsComponent', () => {
    render(buttonBackToNewsComponent())
    expect(buttonBackToNewsComponent()).toMatchSnapshot()

    const buttonInButtonBackToNewsComponent = screen.getByRole('button')
    expect(buttonInButtonBackToNewsComponent).toHaveClass('ui blue big icon button')
  })

  test('navigate(-1) should called once by click with -1', () => {
    const navigate = jest.fn()
    mockedNavigate.mockImplementation(() => navigate)

    render(buttonBackToNewsComponent())
    const buttonInButtonBackToNewsComponent = screen.getByRole('button')

    fireEvent.click(buttonInButtonBackToNewsComponent)
    expect(navigate).toHaveBeenCalledWith(-1)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
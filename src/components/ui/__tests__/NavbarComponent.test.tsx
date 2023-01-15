import * as React from 'react'
import { render, screen } from '@testing-library/react'
import NavbarComponent from '@components/ui/NavbarComponent'

const navbarComponent = (): JSX.Element => <NavbarComponent />

describe('NavbarComponent test', () => {
  test('renders NavbarComponent', () => {
    render(navbarComponent())
    expect(navbarComponent()).toMatchSnapshot()

    const headerOfNavbarComponent = screen.getByRole('heading')
    expect(headerOfNavbarComponent).toBeInTheDocument()
  })
})
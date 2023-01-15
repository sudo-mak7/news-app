import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import CommentsSectionComponent from '@components/comments/CommentsSectionComponent'

const commentsSectionComponent = (): JSX.Element =>
  <Provider store={ store }>
    <CommentsSectionComponent />
  </Provider>

describe('CommentsSectionComponent test', () => {
  test('renders CommentsSectionComponent', () => {
    render(commentsSectionComponent())
    expect(commentsSectionComponent()).toMatchSnapshot()

    const commentInCommentsSectionComponent = screen.getByTestId('comment')

    expect(commentInCommentsSectionComponent).toBeInTheDocument()
    expect(commentInCommentsSectionComponent).toHaveClass('ui comments')
  })
})
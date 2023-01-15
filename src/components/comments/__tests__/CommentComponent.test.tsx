import * as React from 'react'
import * as reduxHooks from '@redux/reduxHooks'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import CommentComponent from '@components/comments/CommentComponent'
import { commentsSlice, fetchComments } from '@redux/comments/commentsSlice'
import { ERROR_LOADING_COMMENTS_MESSAGE } from '@common/messages/errors'
import { CommentsInterface } from '@common/types/commentsInterface'
import { CommentsStateInterface } from '@redux/types'

const kids = [ 2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141 ]
const id = 2921983
const answer = {
  "by" : "pchristensen",
  "id" : 2922097,
  "parent" : 2921983,
  "text" : "Some text",
  "time" : 1314213033,
  "type" : "comment"
}

const initialState = {
  comments: [],
  loading: false,
  error: null
} as CommentsStateInterface

const commentsReducer = commentsSlice.reducer

const mockedUseState = jest.spyOn(React, 'useState')

const commentComponent = (
  { id, by, text, kids, dead, deleted }: CommentsInterface
): JSX.Element =>
  <Provider store={ store }>
    <CommentComponent
      id={ id }
      by={ by }
      text={ text }
      kids={ kids }
      dead={ dead }
      deleted={ deleted }
    />
  </Provider>

const mockedDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')

describe('CommentComponent test', () => {
  test('CommentComponent should to match snapshot', () => {
    const props = {
      id: id,
      by: 'author',
      text: 'Some text',
      kids: [],
      dead: false,
      deleted: false
    }

    mockedUseState.mockImplementationOnce(() => [true, () => null]) // isCollapsed
    mockedUseState.mockImplementationOnce(() => [[], () => null]) // answers
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // isLoading
    mockedUseState.mockImplementationOnce(() => [true, () => null]) // error

    render(commentComponent(props))
    expect(commentComponent(props)).toMatchSnapshot()
  })

  test('renders CommentComponent', () => {
    const props = {
      id: id,
      by: 'author',
      text: 'Some text',
      kids: [],
      dead: false,
      deleted: false
    }

    mockedUseState.mockImplementationOnce(() => [true, () => null]) // isCollapsed
    mockedUseState.mockImplementationOnce(() => [[], () => null]) // answers
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // isLoading
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // error

    render(commentComponent(props))

    const commentInCommentComponent = screen.getByTestId('comment')
    expect(commentInCommentComponent).toBeInTheDocument()
  })

  test('renders CommentComponent with answers', () => {
    const props = {
      id: id,
      by: 'author',
      text: 'Some text',
      kids: kids,
      dead: false,
      deleted: false
    }

    mockedUseState.mockImplementationOnce(() => [true, () => null]) // isCollapsed
    mockedUseState.mockImplementationOnce(() => [[ answer ], () => null]) // answers
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // isLoading
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // error

    render(commentComponent(props))

    const showAnswersButtonInCommentComponent = screen.getByText('Show answers')
    expect(showAnswersButtonInCommentComponent).toBeInTheDocument()
  })

  test('renders CommentComponent with no answers', () => {
    const props = {
      id: id,
      by: 'author',
      text: 'Some text',
      kids: null,
      dead: false,
      deleted: false
    }

    mockedUseState.mockImplementationOnce(() => [true, () => null]) // isCollapsed
    mockedUseState.mockImplementationOnce(() => [[], () => null]) // answers
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // isLoading
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // error

    render(commentComponent(props))

    const showAnswersButtonInCommentComponent = screen.queryByText('Show answers')
    expect(showAnswersButtonInCommentComponent).not.toBeInTheDocument()
  })

  test('renders CommentComponent when dead/deleted comment', () => {
    const props = {
      id: id,
      by: 'author',
      text: 'Some text',
      kids: [ null ],
      dead: true,
      deleted: true
    }

    mockedUseState.mockImplementationOnce(() => [true, () => null]) // isCollapsed
    mockedUseState.mockImplementationOnce(() => [[], () => null]) // answers
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // isLoading
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // error

    render(commentComponent(props))

    const deletedCommentInCommentComponent = screen.getByText(/comment deleted/i)
    expect(deletedCommentInCommentComponent).toBeInTheDocument()
  })

  test('button "Show answers" should changed to "Hide answers"', () => {
    const props = {
      id: id,
      by: 'author',
      text: 'Some text',
      kids: [],
      dead: false,
      deleted: false
    }

    mockedUseState.mockImplementationOnce(() => [false, () => null]) // isCollapsed
    mockedUseState.mockImplementationOnce(() => [[], () => null]) // answers
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // isLoading
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // error

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(commentComponent(props))
    const labelInCommentComponent = screen.getByTestId('button-label')

    fireEvent.click(labelInCommentComponent)

    const deletedCommentInCommentComponent = screen.getByText(/hide answers/i)
    expect(deletedCommentInCommentComponent).toBeInTheDocument()
  })

  test('should render error message', () => {
    mockedUseState.mockImplementationOnce(() => [true, () => null]) // isCollapsed
    mockedUseState.mockImplementationOnce(() => [[], () => null]) // answers
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // isLoading
    mockedUseState.mockImplementationOnce(() => [true, () => null]) // error

    const state = commentsReducer(initialState, fetchComments.rejected)
    expect(state.error).not.toBeNull()

    render(
      <Provider store={ store }>
        <CommentComponent />
      </Provider>
    )

    const errorMessageInCommentComponent = screen.getByText(ERROR_LOADING_COMMENTS_MESSAGE)
    expect(errorMessageInCommentComponent).toBeInTheDocument()
  })

  test('dispatch should called 1 times by click', () => {
    const props = {
      id: id,
      by: 'author',
      text: 'Some text',
      kids: [123456],
      dead: false,
      deleted: false
    }

    mockedUseState.mockImplementationOnce(() => [true, () => null]) // isCollapsed
    mockedUseState.mockImplementationOnce(() => [[], () => null]) // answers
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // isLoading
    mockedUseState.mockImplementationOnce(() => [false, () => null]) // error

    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)

    render(commentComponent(props))
    const labelInCommentComponent = screen.getByTestId('button-label')

    fireEvent.click(labelInCommentComponent)
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
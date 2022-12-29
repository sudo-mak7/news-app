import * as React from 'react'
import { useState } from 'react'
import DOMPurify from 'dompurify'
import { Label, Comment, Header } from 'semantic-ui-react'
import { useAppDispatch } from '@redux/reduxHooks'
import { useAppSelector } from '@redux/reduxHooks'
import { getCommentsErrorSelector } from '@redux/selectors'
import { fetchAnswers } from '@redux/comments/answersSlice'
import { paths } from '@api/url'
import AnswerSectionComponent from '@components/comments/AnswerSectionComponent'
import { CommentsInterface } from '@common/types/commentsInterface'
import { ERROR_LOADING_COMMENTS_MESSAGE } from '@common/messages/errors'

const CommentComponent = (
  { id, by, text, kids, dead, deleted }: CommentsInterface
): JSX.Element => {
  const commentsLoadingError = useAppSelector(getCommentsErrorSelector)

  const [ isCollapsed, setIsCollapsed ] = useState<boolean>(true)
  const [ answers, setAnswersState ] = useState<CommentsInterface[]>([])
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<any>(commentsLoadingError)

  const dispatch = useAppDispatch()

  const handleCollapse = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setIsCollapsed(prev=>!prev)

    const id = Number(e.currentTarget.id)

    if (isCollapsed) {
      dispatch(fetchAnswers({ id, setAnswersState, setIsLoading, setError }))
    }
  }

  const sanitizedHTMLText = () => ({
    __html: DOMPurify.sanitize(text)
  })

  const errorRender =
    <Header
      as='h4'
      textAlign='center'>
      { ERROR_LOADING_COMMENTS_MESSAGE }
    </Header>

  const commentActionsRender =
    <Comment.Actions>
      { kids
          ? <Label
              size='mini'
              style={{ cursor: 'pointer' }}
              id={ id }
              onClick={
                (e: React.MouseEvent<HTMLButtonElement>): void => handleCollapse(e)
              }
            >
              { isCollapsed ? 'Show answers' : 'Hide answers' }
            </Label>
          : ''
      }
    </Comment.Actions>

  const commentContentRender =
    dead || deleted
      ? <Comment.Content>
          <Comment.Author as='a' style={{ color: 'grey' }}>DELETED</Comment.Author>
          <Comment.Text style={{ color: 'grey' }}>Comment deleted</Comment.Text>
          { commentActionsRender }
        </Comment.Content>

      : <Comment.Content>
          <Comment.Author as='a'>{ by }</Comment.Author>
          <Comment.Text
            dangerouslySetInnerHTML={ sanitizedHTMLText() }
          />
          { commentActionsRender }
        </Comment.Content>

  const answersSectionRender =
    kids
      ? <AnswerSectionComponent
          isCollapsed={ isCollapsed }
          answers={ answers }
          isLoading={ isLoading }
        />
      : ''

  const commentRender =
    <Comment id={ id }>
      <Comment.Avatar
        as='a'
        src={ paths.avatarUrl() }
      />
      { commentContentRender }
      { answersSectionRender }
    </Comment>

  return (
    error
      ? errorRender
      : commentRender
  )
}

export default CommentComponent
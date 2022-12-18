import * as React from 'react'
import { Comment, Header, Loader } from 'semantic-ui-react'
import { useAppSelector } from '@redux/reduxHooks'
import { getCommentsErrorSelector } from '@redux/selectors'
import CommentComponent from '@components/comments/CommentComponent'
import { CommentsInterface } from '@common/types/commentsInterface'
import { AnswerSectionComponentInterface } from '@components/types'
import { ERROR_LOADING_ANSWERS_MESSAGE } from '@common/messages/errors'

const AnswerSectionComponent = (
  { isCollapsed, answers, isLoading }: AnswerSectionComponentInterface
): JSX.Element => {
  const commentsLoadingError = useAppSelector(getCommentsErrorSelector)

  const errorRender =
    <Header
      as='h4'
      textAlign='center'>
      { ERROR_LOADING_ANSWERS_MESSAGE }
    </Header>

  const commentsRender =
    commentsLoadingError
      ? errorRender
      : answers.map((a: CommentsInterface) =>
          <CommentComponent
            key={ a.id }
            id={ a.id }
            { ...a }
          />

  )

  const commentGroupRender =
    <Comment.Group>
      { isLoading
          ? <Loader active inline='centered'/>
          : commentsRender
      }
    </Comment.Group>

  return (
    isCollapsed
      ? null
      : commentGroupRender
  )
}

export default AnswerSectionComponent
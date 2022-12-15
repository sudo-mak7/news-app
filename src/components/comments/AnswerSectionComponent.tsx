import * as React from 'react'
import { Comment, Header, Loader } from 'semantic-ui-react'
import { useAppSelector } from '@redux/reduxHooks'
import { getCommentsErrorSelector } from '@redux/selectors'
import CommentComponent from '@components/comments/CommentComponent'
import { CommentsInterface } from '@common-types/commentsInterface'

interface AnswerSectionComponentInterface {
  isCollapsed: boolean,
  answers: CommentsInterface[],
  isLoading: boolean
}

const AnswerSectionComponent = (
  { isCollapsed, answers, isLoading }: AnswerSectionComponentInterface
): JSX.Element => {
  const commentsLoadingError = useAppSelector(getCommentsErrorSelector)

  const errorMessage = 'Error loading answers :('

  const commentsRender = answers.map((a: CommentsInterface) =>
    <CommentComponent
      key={ a.id }
      id={ a.id }
      { ...a }
    />
  )

  return (
    isCollapsed
      ? null
      : <Comment.Group>
          { isLoading
              ? <Loader active inline='centered'/>
              : commentsLoadingError
                  ? <Header as='h4' textAlign='center'>{ errorMessage }</Header>
                  : commentsRender
          }
        </Comment.Group>
  )
}

export default AnswerSectionComponent
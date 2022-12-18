import * as React from 'react'
import { Comment, Loader } from 'semantic-ui-react'
import { useAppSelector } from '@redux/reduxHooks'
import {
  getCommentsLoaderSelector,
  getCommentsSelector
} from '@redux/selectors'
import CommentComponent from '@components/comments/CommentComponent'
import { CommentsInterface } from '@common/types/commentsInterface'

const CommentsSectionComponent = (): JSX.Element => {
  const isLoading = useAppSelector(getCommentsLoaderSelector)
  const comments = useAppSelector(getCommentsSelector)

  const commentsRender = comments.map((c: CommentsInterface) =>
    <CommentComponent
      key={ c?.id }
      id={ c?.id }
      { ...c }
    />
  )

  return (
    <Comment.Group>
      { isLoading
          ? <div style={{ height: '75px' }}>
              <Loader active/>
            </div>
          : commentsRender
      }
    </Comment.Group>
  )
}

export default CommentsSectionComponent
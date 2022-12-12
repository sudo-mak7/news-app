import React from 'react'
import { Comment, Loader } from 'semantic-ui-react'
import {  useSelector } from 'react-redux'
import {
  getCommentsErrorSelector,
  getCommentsLoaderSelector,
  getCommentsSelector
} from '@redux/selectors'
import CommentComponent from '@components/comments/CommentComponent'

const CommentsSectionComponent = ()  => {
  const isLoading = useSelector(getCommentsLoaderSelector)
  const comments = useSelector(getCommentsSelector)
  const error = useSelector(getCommentsErrorSelector)

  const errorMessage = 'Error loading comments :('

  const commentsRender = comments.map(c =>
      <CommentComponent
        key={ c?.id }
        id={ c?.id }
        error={ error }
        errorMessage={ errorMessage }
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
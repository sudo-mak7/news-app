import React from 'react'
import { Comment } from 'semantic-ui-react'
import CommentComponent from './CommentComponent'

const CommentsSection = ({ comment })  => {
  return (
    <Comment.Group>
      <CommentComponent
        author={ comment.author }
        text={ comment.text }
        hasAnswer={ comment.hasAnswer }
      />
    </Comment.Group>
  )
}

export default CommentsSection
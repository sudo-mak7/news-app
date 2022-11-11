import React from 'react'
import { Comment } from 'semantic-ui-react'
import CommentComponent from './CommentComponent'

const AnswerSection = ({ isCollapsed }) => {
  const commentOne = {
    author: `Elliot Fu`,
    text: `No, it wont!`,
    hasAnswer: false
  }
  const commentTwo = {
    author: `Jenny Hess`,
    text: `Maybe it would.`,
    hasAnswer: false
  }

  return (
    <Comment.Group collapsed={ isCollapsed }>
      <CommentComponent
        author={ commentOne.author }
        text={ commentOne.text }
        hasAnswer={ commentOne.hasAnswer }
      />
      <CommentComponent
        author={ commentTwo.author }
        text={ commentTwo.text }
        hasAnswer={ commentTwo.hasAnswer }
      />
    </Comment.Group>
  )
}

export default AnswerSection
import React from 'react'
import { Comment, Loader } from 'semantic-ui-react'
import CommentComponent from './CommentComponent'

const AnswerSectionComponent = ({ isCollapsed, answers, answersLoading }) => {
  const commentsRender = answers.map(a =>
    <CommentComponent
      key={ a.id }
      id={ a.id }
      { ...a }
    />
  )

  return (
    <Comment.Group collapsed={ isCollapsed }>
      { answersLoading
          ? <Loader active inline='centered'/>
          : commentsRender
      }
    </Comment.Group>
  )
}

export default AnswerSectionComponent
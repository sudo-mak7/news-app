import React from 'react'
import { Comment, Header, Loader } from 'semantic-ui-react'
import CommentComponent from '@components/comments/CommentComponent'

const AnswerSectionComponent = ({ isCollapsed, answers, isLoading, error }) => {
  const errorMessage = 'Error loading answers :('

  const commentsRender = answers.map(a =>
    <CommentComponent
      key={ a.id }
      id={ a.id }
      error={ error }
      errorMessage={ errorMessage }
      { ...a }
    />
  )

  return (
    isCollapsed
      ? ''
      : <Comment.Group>
          { isLoading
              ? <Loader active inline='centered'/>
              : error
                  ? <Header as='h4' textAlign='center'>{ errorMessage }</Header>
                  : commentsRender
          }
        </Comment.Group>
  )
}

export default AnswerSectionComponent
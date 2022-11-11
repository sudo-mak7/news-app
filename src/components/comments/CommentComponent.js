import React, { useState } from 'react'
import { Label, Comment } from 'semantic-ui-react'
import AnswerSection from './AnswerSection'

const CommentComponent = ({ author, text, hasAnswer }) => {
  const [ isCollapsed, setIsCollapsed ] = useState(true)

  const handleCollapse = () => {
    isCollapsed === true
      ? setIsCollapsed(false)
      : setIsCollapsed(true)
  }

  return (
    <Comment>
      <Comment.Avatar
        as='a'
        src='https://charity13.ca/wp-content/uploads/2021/05/child-boy.png'
      />
      <Comment.Content>
        <Comment.Author as='a'>{ author }</Comment.Author>
        <Comment.Text>{ text }</Comment.Text>
        <Comment.Actions>
          {!hasAnswer
            ? ''
            : <Label
                size='mini'
                style={{ cursor: 'pointer' }}
                onClick={ () => handleCollapse() }
              >
                {isCollapsed === true
                  ? 'Show answers'
                  : 'Hide answers'
                }
              </Label>
          }
        </Comment.Actions>
      </Comment.Content>

      {!hasAnswer
        ? ''
        : <AnswerSection isCollapsed={ isCollapsed }/>
      }

    </Comment>
  )
}

export default CommentComponent
import React, { useState } from 'react'
import { Label, Comment, Header } from 'semantic-ui-react'
import AnswerSectionComponent from './AnswerSectionComponent'
import { getAnswers, getCurrentItemById } from '../../api/api'

const CommentComponent = ({ id, by, text, kids, dead, deleted }) => {

  const [ answers, setAnswers ] = useState([])
  const [ answersLoading, setAnswersLoading ] = useState([])
  const [ error, setError ] = useState('')

  const errorMessage = 'Error loading comments :('

  const [ isCollapsed, setIsCollapsed ] = useState(true)

  const handleCollapse = (e) => {
    isCollapsed === false
      ? setIsCollapsed(true)
      : setIsCollapsed(false)

    const id = e.currentTarget.id

    setAnswersLoading(true)

    getCurrentItemById(id)
      .then(data => {
        !data
          ? setError(errorMessage)
          : getAnswers(
            data.kids
              ? data.kids
              : setError(errorMessage)
            )
              .then(data => {
                !data
                  ? setError(errorMessage)
                  : setAnswers(data)
                setAnswersLoading(false)
              })
    })
  }

  return (
    <Comment id={ id }>
      <Comment.Avatar
      as='a'
      src='https://transcount.com/views/images/features/avatar.png'
    />

    { dead || deleted
      ? <Comment.Content>
        <Comment.Author as='a' style={{ color: 'grey' }}>DELETED</Comment.Author>
        <Comment.Text style={{ color: 'grey' }}>Comment deleted</Comment.Text>

        <Comment.Actions>
          { !kids
              ? ''
              : <Label
                size='mini'
                style={{ cursor: 'pointer' }}
                id={ id }
                onClick={ (e) => handleCollapse(e) }
              >
                { isCollapsed === true
                    ? 'Show answers'
                    : 'Hide answers'
                }
              </Label>
          }
        </Comment.Actions>
      </Comment.Content>

      : <Comment.Content>
        <Comment.Author as='a'>{ by }</Comment.Author>
        <Comment.Text
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <Comment.Actions>
          { !kids
              ? ''
              : <Label
                size='mini'
                style={{ cursor: 'pointer' }}
                id={ id }
                onClick={ (e) => handleCollapse(e) }
              >
                { isCollapsed === true
                    ? 'Show answers'
                    : 'Hide answers'
                }
              </Label>
          }
        </Comment.Actions>
      </Comment.Content>
    }

    { !kids
        ? ''
        : error
            ? <Header as='h4' textAlign='center'>{ error }</Header>
            : <AnswerSectionComponent
                isCollapsed={ isCollapsed }
                answers={ answers }
                answersLoading={ answersLoading }
              />
    }
  </Comment>
  )
}

export default CommentComponent
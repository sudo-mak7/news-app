import React, { useState } from 'react'
import { Label, Comment, Header } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { fetchAnswers } from '@redux/comments/answersSlice'
import { avatarUrl } from '@api/url'
import AnswerSectionComponent from '@components/comments/AnswerSectionComponent'

const CommentComponent = ({ id, by, text, kids, dead, deleted, errorMessage }) => {
  const [ answers, setAnswersState ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState('')

  const dispatch = useDispatch()

  const [ isCollapsed, setIsCollapsed ] = useState(true)

  const handleCollapse = (e) => {
    isCollapsed === true
      ? setIsCollapsed(false)
      : setIsCollapsed(true)

    const id = e.currentTarget.id

    if (isCollapsed) {
      dispatch(fetchAnswers({id, setAnswersState, setIsLoading, setError}))
    }
  }

  return (
    error
      ? <Header as='h4' textAlign='center'>{ errorMessage }</Header>
      : <Comment id={ id }>
          <Comment.Avatar
          as='a'
          src={ avatarUrl }
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
        : <AnswerSectionComponent
            isCollapsed={ isCollapsed }
            answers={ answers }
            isLoading={ isLoading }
            error={ error }
      />
    }
  </Comment>
  )
}

export default CommentComponent
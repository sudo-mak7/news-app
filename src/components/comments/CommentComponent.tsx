import * as React from 'react'
import { useState } from 'react'
import { Label, Comment, Header } from 'semantic-ui-react'
import { useAppDispatch } from '@redux/reduxHooks'
import { useAppSelector } from '@redux/reduxHooks'
import { getCommentsErrorSelector } from '@redux/selectors'
import { fetchAnswers } from '@redux/comments/answersSlice'
import { avatarUrl } from '@api/url'
import AnswerSectionComponent from '@components/comments/AnswerSectionComponent'
import { CommentsInterface } from '@common-types/commentsInterface'

const CommentComponent = (
  { id, by, text, kids, dead, deleted }: CommentsInterface
): JSX.Element => {
  const commentsLoadingError = useAppSelector(getCommentsErrorSelector)

  const [ isCollapsed, setIsCollapsed ] = useState<boolean>(true)
  const [ answers, setAnswersState ] = useState<CommentsInterface[]>([])
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<any>(commentsLoadingError)

  const errorMessage = 'Error loading comments :('

  const dispatch = useAppDispatch()

  const handleCollapse = (e: React.MouseEvent<HTMLButtonElement>): void => {
    isCollapsed === true
      ? setIsCollapsed(false)
      : setIsCollapsed(true)

    const id = +e.currentTarget.id

    if (isCollapsed) {
      dispatch(fetchAnswers({ id, setAnswersState, setIsLoading, setError }))
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
                        onClick={
                          (e: React.MouseEvent<HTMLButtonElement>): void => handleCollapse(e)
                        }
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
                        onClick={
                          (e: React.MouseEvent<HTMLButtonElement>): void => handleCollapse(e)
                        }
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
      />
    }
  </Comment>
  )
}

export default CommentComponent
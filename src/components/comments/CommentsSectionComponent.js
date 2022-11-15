import React, { useEffect } from 'react'
import { Comment, Header, Loader } from 'semantic-ui-react'
import CommentComponent from './CommentComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../api/api'
import { loading, setComments } from '../../redux/actions/actionCreator'

const CommentsSectionComponent = ({ error, setError })  => {
  const news = useSelector(store => store.currentNewsReducer.news)
  const isLoading = useSelector(store => store.loaderReducer.isLoading)
  const dispatch = useDispatch()

  const comments = useSelector(store => store.commentsReducer.comments)

  useEffect(() => {
    if (news?.hasOwnProperty('kids')) {
      dispatch(loading(true))

      getComments(
        news.kids
          ? news.kids
          : setError('Error loading comments :(')
      ).then(data => {
        !data
          ? setError('Error loading comments :(')
          : dispatch(setComments(data))
        dispatch(loading(false))
      })
    }
  }, [])

  const commentsRender = comments.map(c =>
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
              <Loader active>Loading many comments...</Loader>
            </div>
          : ( error
                ? <Header as='h4' textAlign='center'>{ error }</Header>
                : commentsRender
          )
      }
    </Comment.Group>
  )
}

export default CommentsSectionComponent
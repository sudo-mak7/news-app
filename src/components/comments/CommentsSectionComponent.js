import React, { useEffect } from 'react'
import { Comment, Header, Loader } from 'semantic-ui-react'
import CommentComponent from './CommentComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../api/api'
import { loading } from '../../redux/loading/loadingSlice'
import { setComments } from '../../redux/comments/commentsSlice'

const CommentsSectionComponent = ({ error, setError })  => {
  const news = useSelector(state => state.currentNews.currentNews)
  const isLoading = useSelector(state => state.loading.isLoading)
  const comments = useSelector(state => state.setComments.comments)

  const dispatch = useDispatch()

  const errorMessage = 'Error loading comments :('

  useEffect(() => {
    if (news?.hasOwnProperty('kids')) {
      dispatch(loading(true))

      getComments(
        news.kids
          ? news.kids
          : setError(errorMessage)
      ).then(data => {
        !data
          ? setError(errorMessage)
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
              <Loader active/>
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
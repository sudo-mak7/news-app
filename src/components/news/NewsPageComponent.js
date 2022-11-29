import React, { useState } from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react'
import CommentsSectionComponent from '../comments/CommentsSectionComponent'
import { dateNormalizer } from '../../utils/dateNormalizer'
import { useDispatch, useSelector } from 'react-redux'
import { setComments } from '../../redux/comments/commentsSlice'
import { loading } from '../../redux/loading/loadingSlice'
import { getComments } from '../../api/api'

const NewsPageComponent = () => {
  const news = useSelector(state =>
    (state.currentNews.currentNews || JSON.parse(localStorage.getItem('currentNews')))
    || []
  )


  const [ error, setError ] = useState('')

  const errorMessage = 'Error loading comments :('

  const dispatch = useDispatch()

  localStorage.setItem('currentNews', JSON.stringify(news))

  const updateComments = () => {
    if (news.hasOwnProperty('kids')) {
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
  }

  let date = ''

  if (typeof news.time === 'number') {
    date = dateNormalizer(news.time)
  }

  return (
    <Container text style={{ marginTop: '5em' }}>
      <Segment.Group>
        <Segment attached='top' color='blue'>
          <Header as='h2' color='blue'>
            { news.title || 'No title' }
          </Header>
        </Segment>

        <Segment attached clearing>
          <Label image floated='left'>
            <Icon name='user'></Icon>
            { news.by || 'No author' }
          </Label>
          <Label>
            <Icon name='comment'></Icon>
            Comments
            <Label.Detail>
              { news.descendants }
            </Label.Detail>
          </Label>
          <Label>
            <Icon name='calendar'></Icon>
            { date || 'No date' }
          </Label>

          { news.url
              ? <a href={ news.url }>
                  <Button size='mini' floated='right' color='blue'>
                    Open a news source
                  </Button>
                </a>
              : ''
          }

          <Button
            size='mini'
            floated='right'
            color='blue'
            onClick={ () => { updateComments() } }
          >
            Update comments
          </Button>

        </Segment>

        <Segment attached='bottom'>
          { news.hasOwnProperty('kids')
            ? <CommentsSectionComponent
                error={ error }
                setError={ setError }
              />
            : <Header as='h3' textAlign='center'>No comments yet</Header>
          }
        </Segment>

      </Segment.Group>
    </Container>
  )
}

export default NewsPageComponent
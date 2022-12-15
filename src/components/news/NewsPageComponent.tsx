import * as React from 'react'
import { useEffect } from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Label,
  Loader,
  Segment
} from 'semantic-ui-react'
import { useAppDispatch } from '@redux/reduxHooks'
import { useAppSelector } from '@redux/reduxHooks'
import { fetchCurrentNewsById } from '@redux/news/currentNewsSlice'
import { fetchComments } from '@redux/comments/commentsSlice'
import {
  getCurrentNewsErrorSelector,
  getCurrentNewsLoaderSelector,
  getCurrentNewsSelector,
  getNewsByIdSelector
} from '@redux/selectors'
import { windowScrollUp } from '@utils/windowScrollUp'
import { dateNormalizer } from '@utils/dateNormalizer'
import CommentsSectionComponent from '@components/comments/CommentsSectionComponent'

const NewsPageComponent = (): JSX.Element => {
  const newsId = useAppSelector(getNewsByIdSelector)
  const news = useAppSelector(getCurrentNewsSelector)
  const isLoading = useAppSelector(getCurrentNewsLoaderSelector)
  const error = useAppSelector(getCurrentNewsErrorSelector)

  const errorMessage = 'Error loading current news :('

  const dispatch = useAppDispatch()

  useEffect((): void => {
    windowScrollUp()
    dispatch(fetchCurrentNewsById(newsId))
  }, [])

  const updateComments = (): void => {
    if (news.hasOwnProperty('kids')) {
      dispatch(fetchComments(news.kids))
    }
  }

  let date = ''

  if (typeof news.time === 'number') {
    date = dateNormalizer(news.time)
  }

  return (
    <Container text style={{ marginTop: '5em' }}>
      { isLoading
          ? <Loader active/>
          : error
              ? <Header as='h2' color='blue' textAlign='center'>{ errorMessage }</Header>
              : <Segment.Group>
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
                      onClick={ (): void => { updateComments() } }
                    >
                      Update comments
                    </Button>

                  </Segment>

                  <Segment attached='bottom'>
                    { news.hasOwnProperty('kids')
                        ? <CommentsSectionComponent />
                        : <Header as='h3' textAlign='center'>No comments yet</Header>
                    }
                  </Segment>

                </Segment.Group>
      }
    </Container>
  )
}

export default NewsPageComponent
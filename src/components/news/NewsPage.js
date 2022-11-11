import React from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react'
import NewsText from './news-sections/NewsText'
import CommentsSection from '../comments/CommentsSection'

const NewsPage = ({ comment, comments }) => {
  return (
    <Container text style={{ marginTop: '5em' }}>
      <Segment.Group>
        <Segment attached='top' color='blue'>
          <Header as='h2' color='blue'>
            News' header
            <Button floated='right' color='blue'>Open a news source</Button>
          </Header>
        </Segment>

        <NewsText/>

        <Segment attached clearing>
          <Label image floated='left'>
            <Icon name='user'></Icon>
            Author
          </Label>
          <Label>
            <Icon name='comment'></Icon>
            Comments
            <Label.Detail>214</Label.Detail>
          </Label>
          <Label>
            <Icon name='calendar'></Icon>
            20.02.2022
          </Label>
        </Segment>

        <Segment attached='bottom'>
          {comments
            ? <CommentsSection comment={ comment }/>
            : <Header as='h4'>No comments</Header>
          }
        </Segment>

      </Segment.Group>
    </Container>
  )
}

export default NewsPage
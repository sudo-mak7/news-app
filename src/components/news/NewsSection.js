import React from 'react'
import {
  Header,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import NewsText from './news-sections/NewsText'

const NewsSection = () => {
  return (
    <Segment.Group>
      <Link to='/news-page'>
        <Segment attached='top' color='blue'>
          <Header as='h2' color='blue'>
            News' header
          </Header>
        </Segment>

        <NewsText/>

        <Segment attached='bottom' clearing>
          <Label image floated='left'>
            <Icon name='user'></Icon>
            Author
          </Label>
          <Label>
            <Icon name='star'></Icon>
            Rating
            <Label.Detail>214</Label.Detail>
          </Label>
          <Label>
            <Icon name='calendar'></Icon>
            20.02.2022
          </Label>
        </Segment>
      </Link>
    </Segment.Group>
  )
}

export default NewsSection
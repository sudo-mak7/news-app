import React from 'react'
import {
  Header,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NewsSection = ({ title, by, score, time }) => {
  const getDate = new Date(time * 1000).toLocaleDateString() + ' ('
  const getHours = new Date(time * 1000).getHours() + ':'
  const getMinutes = new Date(time * 1000).getMinutes() < 10
    ? '0' + new Date(time * 1000).getMinutes() + ')'
    : new Date(time * 1000).getMinutes() + ')'

  const date = getDate + getHours + getMinutes

  return (
    <Segment.Group>
      <Link to='/news-page'>
        <Segment attached='top' color='blue'>
          <Header as='h2' color='black'>
            { title || 'No title' }
          </Header>
        </Segment>

        <Segment attached='bottom' clearing>
          <Label image floated='left'>
            <Icon name='user'></Icon>
            { by || 'No author' }
          </Label>
          <Label>
            <Icon name='star'></Icon>
              Rating
            <Label.Detail>
              { score || 'No rating' }
            </Label.Detail>
          </Label>
          <Label>
            <Icon name='calendar'></Icon>
            { date || 'No date' }
          </Label>
        </Segment>
      </Link>
    </Segment.Group>
  )
}

export default NewsSection
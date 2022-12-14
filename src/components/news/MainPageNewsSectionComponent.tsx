import * as React from 'react'
import {
  Header,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '@redux/reduxHooks'
import { setCurrentNewsId } from '@redux/news/newsByIdSlice'
import { dateNormalizer } from '@utils/dateNormalizer'
import { NewsInterface } from '@common/types/newsInterface'

const MainPageNewsSectionComponent = ({
                                        title,
                                        by,
                                        score,
                                        time,
                                        id
}: NewsInterface): JSX.Element => {
  const dispatch = useAppDispatch()

  const date = dateNormalizer(time)

  const getNewsId = (e: React.MouseEvent<HTMLButtonElement>): void => {
    localStorage.removeItem('currentNewsId')
    const id = e.currentTarget.id
    dispatch(setCurrentNewsId(id))
    localStorage.setItem('currentNewsId', JSON.stringify(id))
  }

  return (
    <Segment.Group
      id={ id }
      onClick={ (e): void => getNewsId(e) }
    >
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

export default MainPageNewsSectionComponent
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { loading, setNews } from '../../redux/actions/actionCreator'
import { getNews, getNewsIds } from '../../api/api'
import { get100NewsIds } from '../../utils/get100NewsIds'

const ButtonUpdateNewsComponent = ({ setError }) => {
  const dispatch = useDispatch()

  const updateNews = () => {
    dispatch(loading(true))

    const newsGetter = () => {
      getNewsIds()
        .then(data =>
          !data
            ? setError('Error loading news :(')
            : getNews(
              get100NewsIds(
                data
                  ? get100NewsIds(data)
                  : setError('Error loading news :(')
              )
            )
        )
        .then(data => {
          dispatch(setNews(data))
          dispatch(loading(false))
        })
    }

    newsGetter()
  }

  return (
    <Button
      icon
      size='big'
      color='blue'
      style={{ marginLeft: '1em', zIndex: '999', position: 'fixed' }}
      onClick={ () => updateNews() }
    >
      <Icon name='sync alternate'></Icon>
    </Button>
  )
}

export default ButtonUpdateNewsComponent
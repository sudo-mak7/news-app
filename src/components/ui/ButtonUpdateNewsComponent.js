import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { getNews, getNewsIds } from '../../api/api'
import { get100NewsIds } from '../../utils/get100NewsIds'
import { loading } from '../../redux/loading/loadingSlice'
import { setNews } from '../../redux/news/newsSlice'

const ButtonUpdateNewsComponent = ({ setError }) => {
  const dispatch = useDispatch()

  const errorMessage = 'Error loading news :('

  const updateNews = () => {
    dispatch(loading(true))

    const newsGetter = () => {
      getNewsIds()
        .then(data =>
          !data
            ? setError(errorMessage)
            : getNews(
              get100NewsIds(
                data
                  ? get100NewsIds(data)
                  : setError(errorMessage)
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
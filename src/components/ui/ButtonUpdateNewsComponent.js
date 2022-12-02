import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { newsGetter } from '../../utils/newsGetter'

const ButtonUpdateNewsComponent = ({ setError }) => {
  const dispatch = useDispatch()

  const errorMessage = 'Error loading news :('

  const updateNews = () => {
    newsGetter(dispatch, setError, errorMessage)
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
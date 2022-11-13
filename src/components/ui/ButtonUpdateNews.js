import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { GET_NEWS, LOADING } from '../../redux/constants'
import { useDispatch } from 'react-redux'

const ButtonUpdateNews = () => {
  const dispatch = useDispatch()

  const updateNews = () => {
    dispatch({ type: LOADING, payload: true })
    dispatch({ type: GET_NEWS })
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

export default ButtonUpdateNews
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ButtonBackToNews = ({ props }) => {
  return (
    <Button
      icon
      size='big'
      color='blue'
      style={{ marginLeft: '1em', zIndex: '999', position: 'fixed' }}
      onClick={ () => props.history.goBack() }
    >
      <Icon name='arrow left'></Icon>
    </Button>
  )
}

export default ButtonBackToNews
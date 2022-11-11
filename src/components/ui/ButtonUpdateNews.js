import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ButtonUpdateNews = () => {
  return (
    <Button
      icon
      size='big'
      color='blue'
      style={{ marginLeft: '1em', zIndex: '999', position: 'fixed' }}
    >
      <Icon name='sync alternate'></Icon>
    </Button>
  )
}

export default ButtonUpdateNews
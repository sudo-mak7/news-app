import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ButtonBackToNewsComponent = ({ props }) => {
  const clearCache = () => {
    localStorage.removeItem('currentNews')
    localStorage.removeItem('comments')
  }

  return (
    <Button
      icon
      size='big'
      color='blue'
      style={{ marginLeft: '1em', zIndex: '999', position: 'fixed' }}
      onClick={
        () => {
          props.history.goBack()
          clearCache()
        }
      }
    >
      <Icon name='arrow left'></Icon>
    </Button>
  )
}

export default ButtonBackToNewsComponent
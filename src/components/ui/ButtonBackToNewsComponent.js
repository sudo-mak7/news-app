import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useNavigate  } from 'react-router-dom'

const ButtonBackToNewsComponent = () => {

  const navigate = useNavigate()
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
          navigate(-1)
          clearCache()
        }
      }
    >
      <Icon name='arrow left'></Icon>
    </Button>
  )
}

export default ButtonBackToNewsComponent
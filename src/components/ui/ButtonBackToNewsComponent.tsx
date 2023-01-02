import * as React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useNavigate  } from 'react-router-dom'

const ButtonBackToNewsComponent = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <Button
      icon
      size='big'
      color='blue'
      style={{
        zIndex: '999',
        position: 'fixed',
        top: '0.25em',
        left: '0.25em'
      }}
      onClick={ (): void => { navigate(-1) } }
    >
      <Icon name='arrow left'></Icon>
    </Button>
  )
}

export default ButtonBackToNewsComponent
import React from 'react'
import { Header, Menu } from 'semantic-ui-react'

const NavbarComponent = () => {
  return (
    <Menu fixed='top' widths={ 1 }>
      <Menu.Item as='a' header>
        <Header as='h1' textAlign='center'>LATEST NEWS</Header>
      </Menu.Item>
    </Menu>
  )
}

export default NavbarComponent
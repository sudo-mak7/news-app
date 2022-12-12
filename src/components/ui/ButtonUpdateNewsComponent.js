import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { clearNewsIds, fetchNewsIds } from '@redux/news/newsIdsSlice'
import { clearNews } from '@redux/news/newsSlice'
import { clearPaginationState } from '@redux/pagination/paginationSlice'

const ButtonUpdateNewsComponent = () => {
  const dispatch = useDispatch()

  const updateNews = () => {
    dispatch(clearPaginationState())
    dispatch(clearNews())
    dispatch(clearNewsIds())
    dispatch(fetchNewsIds())
  }

  return (
    <Button
      icon
      size='big'
      color='blue'
      style={{
        marginLeft: '1em',
        zIndex: '999',
        position: 'fixed',
        marginTop: '4em'
      }}
      onClick={ () => updateNews() }
    >
      <Icon name='sync alternate'></Icon>
    </Button>
  )
}

export default ButtonUpdateNewsComponent
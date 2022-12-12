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
        zIndex: '999',
        position: 'absolute',
        top: '0.25em',
        left: '0.25em'
      }}
      onClick={ () => updateNews() }
    >
      <Icon name='sync alternate'></Icon>
    </Button>
  )
}

export default ButtonUpdateNewsComponent
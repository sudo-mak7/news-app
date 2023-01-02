import * as React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { useAppDispatch } from '@redux/reduxHooks'
import { clearNewsIds, fetchNewsIds } from '@redux/news/newsIdsSlice'
import { clearNews } from '@redux/news/newsSlice'
import { clearPaginationState } from '@redux/pagination/paginationSlice'

const ButtonUpdateNewsComponent = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const updateNews = (): void => {
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
        position: 'fixed',
        top: '0.25em',
        left: '0.25em'
      }}
      onClick={ (): void => updateNews() }
    >
      <Icon name='sync alternate'></Icon>
    </Button>
  )
}

export default ButtonUpdateNewsComponent
import { loading } from '@/redux/loading/loadingSlice'
import { getNewsIds } from '@/api/api'
import { getPaginatedNewsIds } from './getPaginatedNewsIds'
import { setNews } from '@/redux/news/newsSlice'

export const newsGetter = (dispatch, setError, errorMessage) => {
  dispatch(loading(true))

  getNewsIds()
    .then(data => {
      if (!data) {
        setError(errorMessage)
      } else {
        const paginatedData = getPaginatedNewsIds(data)
        dispatch(setNews(paginatedData))
      }
    })
}
import * as React from 'react'
import { useEffect } from 'react'
import { Container, Header, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useAppDispatch, useAppSelector } from '@redux/reduxHooks'
import {
  getNewsIdsErrorSelector,
  getNewsIdsLoaderSelector,
  getNewsIdsSelector,
  getNewsSelector,
  getNewsLoaderSelector,
  getNewsErrorSelector,
  getCurrentPageNumberSelector,
  getCurrentPageNewsSelector,
  getPagesLeftSelector
} from '@redux/selectors'
import { clearNewsIds, fetchNewsIds } from '@redux/news/newsIdsSlice'
import { clearNews, fetchNewsByIds } from '@redux/news/newsSlice'
import {
  setCurrentPageNumber,
  setCurrentPageNews,
  setPagesLeft,
  clearPaginationState
} from '@redux/pagination/paginationSlice'
import ButtonUpdateNewsComponent from '@components/ui/ButtonUpdateNewsComponent'
import MainPageNewsSectionComponent from '@components/news/MainPageNewsSectionComponent'
import { lazyLoading } from '@utils/lazyLoading'
import { windowScrollUp } from '@utils/windowScrollUp'
import { NewsInterface } from '@common-types/newsInterface'

const MainPage = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const newsIds = useAppSelector(getNewsIdsSelector)
  const newsIdsIsLoading = useAppSelector(getNewsIdsLoaderSelector)
  const newsIdsLoadingError = useAppSelector(getNewsIdsErrorSelector)

  const news = useAppSelector(getNewsSelector)
  const newsIsLoading = useAppSelector(getNewsLoaderSelector)
  const newsLoadingError = useAppSelector(getNewsErrorSelector)

  const errorMessage = 'Error loading news :('

  const currentPage = useAppSelector(getCurrentPageNumberSelector)
  const currentPageNews = useAppSelector(getCurrentPageNewsSelector)
  const pagesLeft = useAppSelector(getPagesLeftSelector)

  useEffect(() => {
    windowScrollUp()
    if (!newsIds.length) {
      dispatch(fetchNewsIds())
    }
  }, [])

  useEffect(() => {
    if (news.length) {
      dispatch(setCurrentPageNews(news))
    }

    if (!pagesLeft && newsIds.length) {
      dispatch(setPagesLeft(newsIds.length - 1))
    }

    if (pagesLeft) {
      dispatch(setPagesLeft(pagesLeft - 1))
    }
  }, [news])

  useEffect(() => {
    if (!newsIdsIsLoading && !newsIsLoading) {
      return () => {

        dispatch(clearPaginationState())
        dispatch(clearNews())
        dispatch(clearNewsIds())
      }
    }
  }, [])

  useEffect(() => {
    if (currentPage !== 0 && !newsIdsIsLoading && currentPageNews.length) {
       dispatch(fetchNewsByIds(newsIds[currentPage]))
    }
  }, [currentPage])

  const lazyLoadingCallback = () => {
    dispatch(setCurrentPageNumber())
  }

  const target = document.querySelector('#loader')

  useEffect(() => {
    if (!newsIdsIsLoading && !newsIsLoading && target) {
      lazyLoading(lazyLoadingCallback, target)
    }
  }, [target])

  const loaderRender = <Loader active/>

  const errorRender =
    <Header as='h2' color='blue' textAlign='center'>
      { errorMessage }
    </Header>

  const newsRender = currentPageNews.map((n: NewsInterface) =>
    <MainPageNewsSectionComponent
      key={ n.id }
      { ...n }
    />
  )

  return (
    <main style={{ overflow: 'hidden' }}>
      <ButtonUpdateNewsComponent/>

      <Container text style={{ marginTop: '5em' }}>
        { newsIdsLoadingError
            ? errorRender
            : ( newsIdsIsLoading || newsIsLoading ) && !currentPageNews.length
                ? loaderRender
                : newsRender
        }

        { !newsIdsIsLoading
            && pagesLeft > 0
                ? <div id='loader' style={{ height: '50px' }}>
                    <Loader active inline='centered' />
                  </div>
                : newsLoadingError
                   ? errorRender
                   : ''
        }
      </Container>
    </main>
  )
}

export default MainPage

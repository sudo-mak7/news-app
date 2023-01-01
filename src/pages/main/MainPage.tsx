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
import { windowScrollUp } from '@utils/windowScrollUp'
import { NewsInterface } from '@common/types/newsInterface'
import { ERROR_LOADING_NEWS_MESSAGE } from '@common/messages/errors'
import { useInView } from 'react-intersection-observer'

const MainPage = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const newsIds = useAppSelector(getNewsIdsSelector)
  const newsIdsIsLoading = useAppSelector(getNewsIdsLoaderSelector)
  const newsIdsLoadingError = useAppSelector(getNewsIdsErrorSelector)

  const news = useAppSelector(getNewsSelector)
  const newsIsLoading = useAppSelector(getNewsLoaderSelector)
  const newsLoadingError = useAppSelector(getNewsErrorSelector)

  const currentPage = useAppSelector(getCurrentPageNumberSelector)
  const currentPageNews = useAppSelector(getCurrentPageNewsSelector)
  const pagesLeft = useAppSelector(getPagesLeftSelector)

  const { ref, inView } = useInView({
    threshold: 0
  })

  const conditionToFetchNewsByIds = () => {
    return currentPage !== 0 && !newsIdsIsLoading && currentPageNews.length
  }

  const conditionToDoLazyLoading = () => {
    return !newsIdsIsLoading && !newsIsLoading && inView
  }

  const conditionToNewsRender = () => {
    return  ( newsIdsIsLoading || newsIsLoading ) && !currentPageNews.length
  }

  useEffect(() => {
    windowScrollUp()
    if (!newsIds.length) {
      dispatch(fetchNewsIds())
    }

    if (!newsIdsIsLoading && !newsIsLoading) {
      return () => {
        dispatch(clearPaginationState())
        dispatch(clearNews())
        dispatch(clearNewsIds())
      }
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
    if (conditionToFetchNewsByIds()) {
       dispatch(fetchNewsByIds(newsIds[currentPage]))
    }
  }, [currentPage])

  useEffect(() => {
    if (conditionToDoLazyLoading()) {
      dispatch(setCurrentPageNumber())
    }
  }, [inView])

  const errorRender =
    newsLoadingError
      ? <Header
          as='h2'
          color='blue'
          textAlign='center'>
          { ERROR_LOADING_NEWS_MESSAGE }
        </Header>
      : ''

  const newsRender =
    conditionToNewsRender()
        ? <Loader active/>
        : currentPageNews.map((n: NewsInterface) =>
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
            : newsRender
        }

        { !newsIdsIsLoading && pagesLeft > 0
            ? <div
                ref={ ref }
                style={{ height: '50px' }}
              >
                <Loader active inline='centered' />
              </div>
            : errorRender
        }
      </Container>
    </main>
  )
}

export default MainPage

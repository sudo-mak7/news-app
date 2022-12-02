import React, { useEffect, useState } from 'react'
import { Container, Header, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useDispatch, useSelector } from 'react-redux'
import { loading } from '@/redux/loading/loadingSlice'
import { getLoadingStateSelector, getNewsSelector } from '@/redux/selectors'
import { getNews } from '@/api/api'
import { newsGetter } from '@/utils/newsGetter'
import ButtonUpdateNewsComponent from '@/components/ui/ButtonUpdateNewsComponent'
import MainPageNewsSectionComponent from '@/components/news/MainPageNewsSectionComponent'

const MainPage = () => {
  const news = useSelector(getNewsSelector)
  const isLoading = useSelector(getLoadingStateSelector)

  const dispatch = useDispatch()

  const [ error, setError ] = useState('')
  const errorMessage = 'Error loading news :('

  const [ currentPage, setCurrentPage ] = useState(0)
  const [ currentPageNews, setCurrentPageNews ] = useState([])
  const [ totalCountPagesNews, setTotalCountPagesNews ] = useState(0)

  useEffect(() => {
    newsGetter(dispatch, setError, errorMessage)
  }, [])

  useEffect(() => {
    if (news.length) {
      getNews(news[0]).then(data => {
        setCurrentPageNews(data)
        dispatch(loading(false))
      })

      setTotalCountPagesNews(news.length - 1)
    }
  }, [news])

  useEffect(() => {
    if (!isLoading) {
      document.addEventListener('scroll', scrollHandler)
      return () => {
        document.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [])

  useEffect(() => {
    if (currentPage !== 0 && !isLoading && totalCountPagesNews) {
      getNews(news[currentPage]).then(data => {
        setCurrentPageNews(prevState => prevState.concat(data))
        setTotalCountPagesNews(prevState => prevState - 1)
      })
    }
  }, [currentPage])

  const scrollHandler = (e) => {
    if (
      (e.target.documentElement.scrollHeight - (
        e.target.documentElement.scrollTop + window.innerHeight
      )
      === 0) && !isLoading
    ) {
      setCurrentPage(prevState => prevState + 1)
    }
  }

  const loaderRender = <Loader active/>

  const errorRender =
    <Header as='h2' color='blue' textAlign='center'>
      { error }
    </Header>

  const newsRender = currentPageNews.map(n =>
    <MainPageNewsSectionComponent
      key={ n.id }
      { ...n }
    />
  )

  return (
    <main>
      <ButtonUpdateNewsComponent setError={ setError } />

      <Container text style={{ marginTop: '5em' }}>
        { error || ( news.length === [] && !isLoading )
          ? errorRender
          : ( isLoading
              ? loaderRender
              : newsRender
            )
        }

        { !isLoading && totalCountPagesNews
          ? <div style={{ height: '50px' }}>
              <Loader active inline='centered' />
            </div>
          : ''
        }
      </Container>
    </main>
  )
}

export default MainPage

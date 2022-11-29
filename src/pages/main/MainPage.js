import React, { useEffect, useState } from 'react'
import { Container, Header, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ButtonUpdateNewsComponent from '../../components/ui/ButtonUpdateNewsComponent'
import MainPageNewsSectionComponent from '../../components/news/MainPageNewsSectionComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getNews, getNewsIds } from '../../api/api'
import { get100NewsIds } from '../../utils/get100NewsIds'
import { setNews } from '../../redux/news/newsSlice'
import { loading } from '../../redux/loading/loadingSlice'

const MainPage = () => {
  const news = useSelector(state => state.news.news || [])
  const isLoading = useSelector(state => state.loading.isLoading)

  const dispatch = useDispatch()

  const [ error, setError ] = useState('')

  const errorMessage = 'Error loading news :('

  useEffect(() => {
    dispatch(loading(true))

    const newsGetter = () => {
      getNewsIds()
        .then(data =>
          !data
            ? setError(errorMessage)
            : getNews(
                get100NewsIds(
                  data
                    ? get100NewsIds(data)
                    : setError(errorMessage)
                )
            )
        )
          .then(data => {
            dispatch(setNews(data))
            dispatch(loading(false))
          })

      if (isLoading) {
        dispatch(loading(false))
      }
    }
    
    newsGetter()

    const autoUpdateNews = setInterval(() => {
      newsGetter()
    }, 60 * 1000)

    return () => clearInterval(autoUpdateNews)
  }, [])

  const loaderRender = <Loader active/>

  const errorRender =
    <Header as='h2' color='blue' textAlign='center'>
      { error }
    </Header>

  const newsRender = news.map(n =>
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
      </Container>
    </main>
  )
}

export default MainPage

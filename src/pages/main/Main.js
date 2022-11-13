import React, { useEffect } from 'react'
import { Container, Header, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ButtonUpdateNews from '../../components/ui/ButtonUpdateNews'
import NewsSection from '../../components/news/NewsSection'
import { GET_NEWS } from '../../redux/constants'
import { useDispatch, useSelector } from 'react-redux'

const Main = () => {
  const news = useSelector(store => store.newsReducer.news || [])
  const error = useSelector(store => store.errorsReducer.error || '')
  const isLoading = useSelector(store => store.loaderReducer.isLoading || false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: GET_NEWS })
    setInterval(() => {
      dispatch({ type: GET_NEWS })
    }, 60 * 1000)
  }, [dispatch])

  const loaderRender = <Loader active/>

  const errorRender =
    <Header as='h2' color='blue' textAlign='center'>
      {JSON.stringify(error).slice(1, error.length + 1)}
    </Header>

  const newsRender = news.map(n =>
    <NewsSection
      key={n.id}
      {...n}
    />
  )

  return (
    <main>
      <ButtonUpdateNews/>

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

export default Main

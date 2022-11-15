import React, { useEffect } from 'react'
import ButtonBackToNewsComponent from '../../components/ui/ButtonBackToNewsComponent'
import NewsPageComponent from '../../components/news/NewsPageComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentItemById } from '../../api/api'
import { setCurrentNews } from '../../redux/actions/actionCreator'

const NewsPage = (props) => {
  const newsId = useSelector(store => store.newsIdReducer.id)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentItemById(newsId).then(data => { dispatch(setCurrentNews(data)) })
  }, [])

  return (
    <main>
      <ButtonBackToNewsComponent props={ props }/>

      <article>
        <NewsPageComponent/>
      </article>
    </main>
  )
}

export default NewsPage
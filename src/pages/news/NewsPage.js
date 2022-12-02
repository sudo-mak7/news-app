import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentNews } from '@/redux/news/currentNewsSlice'
import { getNewsIdSelector } from '@/redux/selectors'
import { getCurrentItemById } from '@/api/api'
import ButtonBackToNewsComponent from '@/components/ui/ButtonBackToNewsComponent'
import NewsPageComponent from '@/components/news/NewsPageComponent'

const NewsPage = (props) => {
  const newsId = useSelector(getNewsIdSelector)
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
import React from 'react'
import ButtonBackToNewsComponent from '@components/ui/ButtonBackToNewsComponent'
import NewsPageComponent from '@components/news/NewsPageComponent'

const CurrentNewsPage = () => {
  return (
    <main>
      <ButtonBackToNewsComponent/>

      <article>
        <NewsPageComponent/>
      </article>
    </main>
  )
}

export default CurrentNewsPage
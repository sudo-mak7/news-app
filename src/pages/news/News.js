import React from 'react'
import ButtonBackToNews from '../../components/ui/ButtonBackToNews'
import NewsPage from '../../components/news/NewsPage'

const News = (props) => {
  const comment = {
    author: `Christian Rocha`,
    text: `I'm very interested in this motherboard. Do you know if it'd work in a Intel LGA775 CPU socket?`,
    hasAnswer: true
  }

  const comments = true

  return (
    <main>
      <ButtonBackToNews props={ props }/>

      <article>
        <NewsPage
          comment={ comment }
          comments={ comments }
        />
      </article>
    </main>
  )
}

export default News
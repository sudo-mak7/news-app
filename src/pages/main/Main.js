import React from 'react'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ButtonUpdateNews from '../../components/ui/ButtonUpdateNews'
import NewsSection from '../../components/news/NewsSection'

const Main = () => {
  return (
    <main>
      <ButtonUpdateNews/>

      <Container text style={{ marginTop: '5em' }}>
        <NewsSection/>
        <NewsSection/>
        <NewsSection/>
        <NewsSection/>
        <NewsSection/>
      </Container>
    </main>
  )
}

export default Main

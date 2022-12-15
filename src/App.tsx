import * as React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import NavbarComponent from '@components/ui/NavbarComponent'
import MainPage from '@pages/main/MainPage'
import CurrentNewsPage from '@pages/news/currentNewsPage'

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <NavbarComponent/>

      <Routes>
        <Route
          path='/'
          element={ <MainPage /> }
        />
        <Route
          path='/news-page'
          element={ <CurrentNewsPage /> }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
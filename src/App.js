import React from 'react'
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import NavbarComponent from './components/ui/NavbarComponent'
import MainPage from './pages/main/MainPage'
import NewsPage from './pages/news/NewsPage'

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComponent/>

      <Switch>
        <Route
          exact
          path='/'
          component={ MainPage }
        />
        <Route
          path='/news-page'
          component={ NewsPage }
        />
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
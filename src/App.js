import React from 'react'
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Navbar from './components/ui/Navbar'
import Main from './pages/main/Main'
import News from './pages/news/News'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>

      <Switch>
        <Route
          exact
          path='/'
          component={ Main }
        />
        <Route
          path='/news-page'
          component={ News }
        />
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
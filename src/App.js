import React from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import NavbarComponent from '@components/ui/NavbarComponent'
import MainPage from '@pages/main/MainPage'
import CurrentNewsPage from '@pages/news/currentNewsPage'

const App = () => {
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
          render={ () => <Navigate to='/' /> }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
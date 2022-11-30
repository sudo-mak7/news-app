import React from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import NavbarComponent from './components/ui/NavbarComponent'
import MainPage from './pages/main/MainPage'
import NewsPage from './pages/news/NewsPage'

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
          element={ <NewsPage /> }
          render={ () => <Navigate to='/' /> }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
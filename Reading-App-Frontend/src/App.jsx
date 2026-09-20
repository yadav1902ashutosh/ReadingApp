import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login as authLogin, logout as authLogout } from './store/authSlice'
import authService from './auth/auth'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(authLogin({ userData }))
        } else {
          dispatch(authLogout())
        }
      })
      .catch(() => {
        dispatch(authLogout())
      })
  }, [dispatch])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App

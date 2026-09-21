import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login as authLogin, logout as authLogout } from './store/authSlice'
import authService from './auth/auth'
import './App.css'
import Header from './components/header/Header'
import MobileNav from './components/header/MobileNav'
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
      <main className="pb-20 xl:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}

export default App

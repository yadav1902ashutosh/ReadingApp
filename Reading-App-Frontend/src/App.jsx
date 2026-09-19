import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
function App() {
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

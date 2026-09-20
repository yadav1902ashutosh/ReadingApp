// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthLayout} from "./components/index.js"
import { Provider } from 'react-redux'
import store from "./store/Store.js"

// Local Font Imports
import '@fontsource/merriweather/300.css'
import '@fontsource/merriweather/400.css'
import '@fontsource/merriweather/700.css'

import '@fontsource/vollkorn/600.css'
import '@fontsource/vollkorn/700.css'

import '@fontsource/work-sans/400.css'
import '@fontsource/work-sans/500.css'
import '@fontsource/work-sans/600.css'

// Local Material Symbols Icons
import 'material-symbols'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import {Profile} from './components/index.js'
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/profile",
          element: (
            <AuthLayout authentication={true}>
              <Profile />
            </AuthLayout>
          ),
        },
      ],
    },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store ={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
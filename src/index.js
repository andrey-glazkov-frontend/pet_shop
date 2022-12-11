import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App'

import { Header } from './components/Header/Header'
import { Registration } from './components/Registration/Registration'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'signin',
    element: <Registration />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>,
)

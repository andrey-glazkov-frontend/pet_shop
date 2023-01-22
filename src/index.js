import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {

  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App'
import { Main } from './components/Main/Main'

// import { Header } from './components/Header/Header'
import { Registration } from './components/Registration/Registration'
import { UserDetail } from './components/UserDetail/UserDetail'
import { Card } from './components/Card/Card'
import { store } from './redux/types/store'
import { Cart } from './components/Cart/Cart'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      {
        path: 'signin',
        element: <Registration />,
      },
      {
        path: 'profile',
        element: <UserDetail />,
      },
      {
        path: 'products',
        element: <Card />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)

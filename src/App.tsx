import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages'
import Login from './pages/login'
import Register from './pages/register'

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />

    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ])



  return (
    <div className='w-screen overflow-x-hidden'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
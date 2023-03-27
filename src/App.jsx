import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getUserProfile } from './app/middlewares'
import Home from './pages/Home'
import Layout from './components/Layout'
import User from './pages/User'
import './scss/main.scss'
import LogIn from './pages/LogIn'
import ErrorDisplay from './pages/ErrorDisplay'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <LogIn />,
      },
      {
        path: 'profile',
        element: <User />,
      },
      {
        path: '*',
        element: <ErrorDisplay code='404' message={'La page n\'existe pas'} />
      }

    ]
  }
])

function App() {
  const dispatch = useDispatch()
  const userToken = useSelector((state) => state.auth.userToken)
  
  useEffect(() => {
    if(userToken) {
      dispatch(getUserProfile())
    }
  }, [userToken, dispatch])
  

  return (
    <RouterProvider router={router} />   
  )
}

export default App;

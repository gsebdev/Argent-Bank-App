import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getUserProfile } from './app/middlewares'
import Home from './components/Home'
import Layout from './components/Layout'
import SignIn from './components/SignIn'
import User from './components/User'
import './scss/main.scss'

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
        path: 'sign-in',
        element: <SignIn />
      },
      {
        path: 'account',
        element: <User />
      }
    ]
  }
])

function App() {
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.auth.loggedIn)

  useEffect(() => {
    if(loggedIn) {
      dispatch(getUserProfile())
      console.log('userprofile')
    }
  }, [loggedIn, dispatch])
  

  return (
    <RouterProvider router={router} />   
  )
}

export default App;

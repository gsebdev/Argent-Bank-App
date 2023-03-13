import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
  return (
    <RouterProvider router={router} />   
  )
}

export default App;

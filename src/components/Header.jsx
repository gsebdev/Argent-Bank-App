import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../app/middlewares'
import logo from '../img/argentBankLogo.png'

export default function Header() {
  const userLoggedIn = useSelector((state) => state.auth.loggedIn)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleSignOutClick = (e) => {
    e.preventDefault()
    dispatch(signOut)
  }

  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/'>
        <img
          className='main-nav-logo-image'
          src={logo}
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div>
        {
          !userLoggedIn ?
            <Link className='main-nav-item' to='sign-in'>
              <i className='fa fa-user-circle'></i>
              Sign In
            </Link> :
            <React.Fragment>
              <Link className='main-nav-item' to='account'>
                <i className='fa fa-user-circle' />
                {user.firstName}
              </Link>
              <a className='main-nav-item' href='/' onClick={handleSignOutClick}>
                <i className='fa fa-sign-out' />
                Sign Out
              </a>
            </React.Fragment>
        }

      </div>
    </nav>
  )
}
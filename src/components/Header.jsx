import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions as authActions } from '../features/auth'
import logo from '../img/argentBankLogo.png'

export default function Header() {
  const userLoggedIn = useSelector((state) => state.auth.loggedIn)
  const dispatch = useDispatch()


  const handleSignOutClick = (e) => {
    e.preventDefault()
    dispatch(authActions.signout())
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
      {!userLoggedIn ? <Link className='main-nav-item' to='sign-in'>
        <i className='fa fa-user-circle'></i>
        Sign In
      </Link> :
      <a className='main-nav-item' href='/' onClick={handleSignOutClick}>
         <i className='fa fa-user-circle'></i>
        Sign Out
      </a>
      }
      
    </div>
  </nav>
  )
}
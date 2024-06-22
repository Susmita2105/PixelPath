import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// import {authSlice} from '../../store/authSlice'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()
  const navItems = [
      {
        name: 'Home',
        slug: "/",
        active: true
      }, 
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "My Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
    ]

  return (
    <header className='py-1 shadow bg-cyan-100 text-black'>
      <Container>
          <nav className='flex text-xl'>
            <div className='mr-4'>
              <Link to='/'>
                  <Logo width='70px'  />
              </Link>
            </div>

            <ul className='flex ml-auto mt-4'>
              {navItems.map((item) => 
              item.active ?(
                <li key={item.name}>
                  <button
                  onClick={() => navigate(item.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-400 hover:text-white hover:font-bold rounded-full'
                  >
                    {item.name}
                  </button>
                </li>               
              ) : null
              )}

              {
                authStatus && (
                  <li>
                    <LogoutBtn/>
                  </li>
                )
              }
              {/*  syntax to say if authstatus is true, then only the following code will be execute */}

            </ul>
          </nav>
      </Container>
    </header>
  )
}

export default Header

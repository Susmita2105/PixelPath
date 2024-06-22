import React from 'react'
import {useDispatch} from 'react-redux'
import authServiceObject from '../../appwrite/auth'
import logout from '../../store/authSlice'

function logoutBtn() {

  const dispatch = useDispatch();

  const logoutHandler = () =>{
    authServiceObject.logout().then(() =>{
        dispatch(logout())
    })
  }

  return (
    <button
    onClick={logoutHandler}
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-400 hover:text-white hover:font-bold rounded-full'
    >
        Logout
    </button>
  )
}

export default logoutBtn

import conf from './conf/conf'
import authServiceObject from './appwrite/auth'
import { React, useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL)
  // console.log(conf.appwriteUrl)

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log("hi")
    authServiceObject.getCurrentUser()
    .then((userData) =>{
      // console.log("user data: ", userData)

      if(userData){
        dispatch(login({userData}))
      }
      else{
        // console.log("logout")
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
      dispatch(logout());
    })
    .finally(() => {
      // console.log('finally');
      setLoading(false)
    })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between text-center bg-orange-300  text-3xl'>
      <div className='w-full block'>
        <Header/>
        <main className='p-2 min-h-80'>
            <p className='font-style: italic text-xl'>Capturing Moments, One Pixel at a Time. </p> 
            <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ): null
}

export default App

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
// we'll use login as authLogin here
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authServiceObject from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    // handleSubmit and register both are keywords that we get from useForm and both of them are events 
    const [error, setError] = useState(null);

    const login = async(data) =>{
        // console.log("hello from login", data)
        setError("")
        try{
            const session = await authServiceObject.login(data)
            // console.log(session)
            if(session){
                const userData = await authServiceObject.getCurrentUser()
                // console.log(userData.$id)
                localStorage.setItem("userId",userData.$id)
                // const x= localStorage.getItem("userId")
                // console.log("x",x);
                if(userData){
                    dispatch(authLogin(userData))
                    navigate("/")
                    // navigate to root if logged in and with navigate function, we don't need to click any link and programatically we can send the user to the desired location
                }
            }

        }
        catch(error){
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px] text-black" >
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center text-base">{error}</p>}

            <form onSubmit={handleSubmit(login)} className='mt-8 text-black'>
                <div className='space-y-5 text-base'>
                    <Input 
                    label="Email: "
                    placeholder="Enter your Email"
                    type= "email"
                    // spreading of register is important, otherwise it'll override all other registers and name like "email" should be unique always
                    {...register("email",{
                        required:true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                        // you'll get validate matchpattern from regxr.com
                    })}
                    />
                    
                    <Input
                    label="Password: "
                    placeholder="Enter your password "
                    type='password'
                    {...register("password",{
                        required:true,
                    })}
                    />

                    <Button
                    type="submit"
                    className="w-full"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login

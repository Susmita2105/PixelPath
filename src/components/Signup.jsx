import React from 'react'
import { useState } from 'react'
import authServiceObject from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { set, useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate();
    const [error, setError]  = useState(null);
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const create = async(data) => {
        // console.log(data)
        setError("")
        try{
            const userData =  await authServiceObject.createAccount(data)
            // console.log(userData)
            if(userData){
                // console.log(userData)
                dispatch(authLogin(userData))
                navigate("/")
            }
        }
        catch(error){
            // console.log("hello error")
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center text-black ">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200hover:underline"
                >
                    Sign In
                </Link>
            </p>

            {error && <p className="text-red-600 mt-8 text-center text-base">{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5 text-base'>
                    <Input
                    label="Name: "
                    placeholder= "Enter your name "
                    type="text"
                    {...register("name",{
                        required:true,
                    })}
                    />
                    
                    <Input 
                    label="Email: "
                    placeholder="Enter your Email"
                    type= "email"
                    {...register("email",{
                        required:true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />

                    <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    {...register("password",{
                        required:true,
                    })}
                    />

                    <Button
                    type='submit'
                    className='w-full'
                    >
                        Create Account
                    </Button>
                </div>
            </form>

        </div>
    </div>
  )
}

export default Signup

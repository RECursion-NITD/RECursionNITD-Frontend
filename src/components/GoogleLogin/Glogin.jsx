/* eslint-disable */
import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from './GoogleIcon';
import { loginWithGoogle } from '../../api/loginWithGoogle';
import useAuth from '../../hooks/useAuth';
const Glogin = () => {
    const { token, decodeTokens, setStatus, status } = useAuth();
    
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            loginWithGoogle(tokenResponse.access_token)
            .then((res)=>{
                decodeTokens(res)
            })
        },
    });


    return (
        <div onClick={() => login()} className='flex w-full bg-[#81E6D9] p-3 rounded-lg cursor-pointer justify-around hover:bg-[#4FD1C5]'>
            <div>
                <GoogleIcon />
            </div> 
            <div className='font-head font-bold text-sm lg:text-sm'>
                Sign in  with Google
            </div>
        </div>
    )
}

export default Glogin
import { login as reduxLogin } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from './index';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import config from '../appwrite/config';

// TODO: add show and hide password
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setServerError('');
        setLoading(true)

        try {
            const session = await authService.login(data);
            if(session) {
                const userData = await authService.getCurrentUser();
                if(userData) {
                    config.getAuthor(userData?.$id).then(author => {
                      if(author) {
                        const {isVerified, image, facebookLink, linkedinLink, role, bio, gender} = author;
                        dispatch(reduxLogin({...userData, isVerified, image, facebookLink, linkedinLink, gender, role, bio}))
                      } else {
                        dispatch(reduxLogin(userData));
                      }
                    })
                  }
                navigate('/');
            }
        } catch (error) {
            setServerError(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full text-center">
                    <Logo />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {serverError && <p className="text-red-600 mt-8 text-center">{serverError}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        label='Email: '
                        placeholder='Enter your email'
                        type='email'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    { errors.email && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}

                    <Input
                        label='Password: '
                        placeholder='Enter your password'
                        type='password'
                        {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                    />
                    { errors.password && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}

                    <Button type="submit" disabled={loading}>{loading ? 'loading...' : 'Sign in'}</Button>
                </div>
            </form>
            </div>
        </div>
    )
};

export default Login;
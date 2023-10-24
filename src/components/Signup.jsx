import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Dropdown, Input, Logo, TextArea } from './index';
import { useForm } from 'react-hook-form';
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import config from '../appwrite/config'
import Swal from "sweetalert2";

const options = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Others', value: 'others' },
];

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isBecomeAuthor, setIsBecomeAuthor] = useState(false);
    const {register, handleSubmit} = useForm(); 
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = ({ value }) => {
        setSelectedOption(value);
    };

    const signup = async (data) => {
        if(!selectedOption) {
            Swal.fire('Ooop! You can not select gender')
            return;
        }
        if(data.bio.length > 500) {
            Swal.fire('Your bio data should be less than 500 char.')
            return;
        }

        setError('');

        try{
            const { name, email, password, image, facebookLink, linkedinLink, gender, bio } = data;

            await authService.createAccount({name, email, password});
            const userData = await authService.getCurrentUser();

            if(userData) {
                if(isBecomeAuthor) {
                    const userId = userData.$id;
                    const responseAuthor = await config.createAuthor(
                        { image, facebookLink, linkedinLink, userId, gender, bio }
                    );

                    const { isVerified, role } = responseAuthor;
                    if(responseAuthor)  dispatch(login(userData, { isVerified, image, facebookLink, linkedinLink, role, bio, gender }));
                }
                else dispatch(login(userData));
            }
            navigate('/');
        } catch(error) { setError(error.message) }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full text-center">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(signup)} className="mt-3">
                    <div className='space-y-5'>
                        <Input
                            label='Full Name: '
                            placeholder='Enter your full name'
                            type='text'
                            {...register('name', {
                                required: true,
                                maxLength: 20,
                                minLength: 3
                            })}
                        />

                        {/* become an author */}
                        <div className="flex gap-3 items-center">
                            <div className='mb-1 pl-1'>
                                Become an author:
                            </div>
                            <div className="flex gap-8">
                                <div className="flex items-center">
                                    <label htmlFor="yes">Yes</label>
                                    <input onClick={() => setIsBecomeAuthor(true)} name='author' type="radio" id="yes" className="ml-2"/>
                                </div>
                                <div className="flex items-center">
                                    <label htmlFor="no">No</label>
                                    <input onClick={() => setIsBecomeAuthor(false)} name='author' type="radio" id="no" className="ml-2"/>
                                </div>
                            </div>
                        </div>

                        {
                          isBecomeAuthor ?  <>
                                <Input 
                                    label="Image:" 
                                    placeholder='Enter your profile image' 
                                    type='url' 
                                    required
                                    {...register('image')}
                                />

                                <Input 
                                    label="Facebook Profile:" 
                                    placeholder='Enter your facebook profile link' 
                                    type='url' 
                                    required
                                    {...register('facebookLink')}
                                />

                                <Input 
                                    label="Linkedin Profile:" 
                                    placeholder='Enter your linkedin profile link' 
                                    type='url' 
                                    required
                                    {...register('linkedinLink')}
                                />

                                <div className='flex gap-2'>
                                    Gender: <Dropdown options={options} onSelect={handleSelect} />
                                </div>

                                <div className='lg:col-span-2 md:col-span-full'>
                                    <TextArea 
                                    label='About yourself:'
                                    placeholder='Tell me About yourself' 
                                    type='url' 
                                    rows='5'
                                    required
                                    {...register('bio')}
                                    />
                                </div>
                            </>
                          : null
                        }   

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

                        <Input
                            label='Password: '
                            placeholder='Enter your password'
                            type='password'
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                        />

                        <Button type="submit">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Signup;
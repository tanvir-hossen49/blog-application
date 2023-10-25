import { useState } from "react";
import { useDispatch } from "react-redux";
import { AlertMessage, Button, Dropdown, Input, Logo, TextArea } from './index';
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
    const {register, handleSubmit, formState: {errors}} = useForm(); 
    const [serverError, setServerError] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = ({ value }) => {
        setSelectedOption(value);
    };

    const signup = async (data) => {
        if(isBecomeAuthor) {
            if(!selectedOption) {
                Swal.fire('Ooop! You can not select gender')
                return;
            }

            if(data.bio.length > 500) {
                Swal.fire('Your bio data should be less than 500 char.')
                return;
            }
        }
        
        setServerError('');

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
        } catch(error) { setServerError(true) }
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

                {serverError ? <AlertMessage 
                    showAlert={serverError} 
                    setShowAlert={setServerError}
                    type='error'
                    message='Something went wrong' 
                /> : null}
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
                        { errors.name && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}

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
                                    {...register('image')}
                                />
                                { errors.image && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}

                                <Input 
                                    label="Facebook Profile:" 
                                    placeholder='Enter your facebook profile link' 
                                    type='url'
                                    {...register('facebookLink')}
                                />
                                { errors.facebookLink && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}

                                <Input 
                                    label="Linkedin Profile:" 
                                    placeholder='Enter your linkedin profile link' 
                                    type='url'
                                    {...register('linkedinLink')}
                                />
                                { errors.linkedinLink && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
                                <div className='flex gap-2'>
                                    Gender: <Dropdown options={options} onSelect={handleSelect} />
                                </div>

                                <div className='lg:col-span-2 md:col-span-full'>
                                    <TextArea 
                                    label='About yourself:'
                                    placeholder='Tell me About yourself' 
                                    type='url' 
                                    rows='5'
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

                        <Button type="submit">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Signup;
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from 'react';
import App from '../App';
import { AuthLayout, BecomeAuthorForm, Loader } from '../components';
import Bookmark from "../pages/Bookmark";

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const AddPost = lazy(() => import('../pages/AddPost'));
const Post = lazy(() => import('../pages/Post'));
const EditPost = lazy(() => import('../pages/EditPost'));
const MyPost = lazy(() => import('../pages/MyPost'));
const About = lazy(() => import('../pages/About'));
const BecomeAuthor = lazy(() => import('../pages/BecomeAuthor'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element:  <Suspense fallback={<Loader />}>
                    <Home />    
                </Suspense>
            },
            {
                path: '/login',
                element: (
                    <AuthLayout authentication={false}>
                        <Suspense fallback={<Loader />}>
                            <Login />
                        </Suspense>   
                    </AuthLayout>
                )
            },
            {
                path:'/signup',
                element: (
                    <AuthLayout authentication={false}>
                        <Suspense fallback={<Loader />}>
                            <Signup />
                        </Suspense>    
                    </AuthLayout>
                )
            },
            {
                path: '/add-post',
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<Loader />}>
                            <AddPost />
                        </Suspense>
                    </AuthLayout>
                )
            },
            {
                path: '/post/:slug',
                element: <Suspense fallback={<Loader />}>
                    <Post />
                </Suspense>
            },
            {
                path: '/edit-post/:slug',
                element:(
                    <AuthLayout authentication>
                        <Suspense fallback={<Loader />}>
                            <EditPost />
                        </Suspense>
                    </AuthLayout>
                )
            }, 
            {
                path: '/my-posts',
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<Loader />}>
                            <MyPost/>
                        </Suspense>
                    </AuthLayout>
                )
            },
            {
                path: '/become-an-author',
                element: (
                    <Suspense fallback={<Loader />}>
                        <BecomeAuthor />
                    </Suspense>
                )
            },
            {
                path: '/become-author-form',
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<Loader />}>
                            <BecomeAuthorForm />
                        </Suspense>
                    </AuthLayout> 
                )
            },
            {
                path: '/about',
                element: <Suspense fallback={<Loader />}>
                    <About />
                </Suspense>
            },
            {
                path: '/bookmark',
                element: <Suspense fallback={<Loader />}>
                    <Bookmark />
                </Suspense>
            }
        ]
    }
]);
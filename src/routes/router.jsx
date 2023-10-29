import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from 'react';
import App from '../App';
import { AuthLayout, BecomeAuthorForm, Loader } from '../components';
import Dashboard from "../layout/Dashboard";
import AdminRoute from "./AdminRoute";
import ManageAuthor from "../pages/Dashboard/Admin/ManageAuthor";

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const AddPost = lazy(() => import('../pages/Dashboard/Author/AddPost'));
const Post = lazy(() => import('../pages/Post'));
const EditPost = lazy(() => import('../pages/Dashboard/Author/EditPost'));
const MyPost = lazy(() => import('../pages/Dashboard/Author/MyPost'));
const About = lazy(() => import('../pages/About'));
const BecomeAuthor = lazy(() => import('../pages/BecomeAuthor'));
const MyFavoriteBlog = lazy(() => import('../pages/MyFavoriteBlog'));

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
                path: '/my-favorite',
                element: <Suspense fallback={<Loader />}>
                    <MyFavoriteBlog />
                </Suspense>
            },
            {
                path: '/post/:slug',
                element: <Suspense fallback={<Loader />}>
                    <Post />
                </Suspense>
            }, 
        ]
    }, 
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            // admin routes
            {
                path: 'manage-author',
                element: <AdminRoute > 
                    <ManageAuthor />
                </AdminRoute>
            },
            {
                path: 'my-posts',
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<Loader />}>
                            <MyPost/>
                        </Suspense>
                    </AuthLayout>
                )
            },
            {
                path: 'edit-post/:slug',
                element:(
                    <AuthLayout authentication>
                        <Suspense fallback={<Loader />}>
                            <EditPost />
                        </Suspense>
                    </AuthLayout>
                )
            },
            {
                path: 'add-post',
                element: (
                    <AuthLayout authentication>
                        <Suspense fallback={<Loader />}>
                            <AddPost />
                        </Suspense>
                    </AuthLayout>
                )
            },
        ]
    }
]);
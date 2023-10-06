import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AddPost from '../pages/AddPost';
import Post from '../pages/Post';
import EditPost from '../pages/EditPost';
import { AuthLayout } from '../components';
import MyPost from "../pages/MyPost";
import About from "../pages/About";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                )
            },
            {
                path:'/signup',
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                )
            },
            {
                path: '/add-post',
                element: (
                    <AuthLayout authentication>
                        <AddPost />
                    </AuthLayout>
                )
            },
            {
                path: '/post/:slug',
                element: (
                    <AuthLayout authentication>
                        <Post />
                    </AuthLayout>
                )
            },
            {
                path: '/edit-post/:slug',
                element:(
                    <AuthLayout authentication>
                        <EditPost />
                    </AuthLayout>
                )
            }, 
            {
                path: '/my-posts',
                element: (
                    <AuthLayout authentication>
                        <MyPost/>
                    </AuthLayout>
                )
            },{
                path: '/about',
                element: <About />
            }
        ]
    }
]);
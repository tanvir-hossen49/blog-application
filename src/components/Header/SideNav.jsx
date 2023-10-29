import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import placeholderImage from '../../assets/placeholder.png'
import { CloseButton } from '../index.js'

const SideNav = ( {setIsOpen, authStatus} ) => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('');
    const userData = useSelector(state => state.auth.userData);

    const isAdmin = userData.labels.includes('admin');
    const isAuthor = userData?.isVerified && userData.role === 'author';

    const isDashboardActive = authStatus && isAuthor || isAdmin && 
                            !activeNav.includes('/dashboard');

    const isNotDashboardActive = !authStatus || !activeNav.includes('/dashboard');

    const navItems = [
        { 
            name: 'Home', 
            slug: '/', 
            active: true && isNotDashboardActive
        },
        { 
            name: 'My Posts', 
            slug: '/dashboard/my-posts', 
            active: isAuthor || isAdmin && !isDashboardActive
        },
        { 
            name: 'Add Post', 
            slug: '/dashboard/add-post', 
            active: isAuthor || isAdmin && !isDashboardActive
        },
        { 
            name: 'Become An Author', 
            slug: '/become-an-author', 
            active: !isAuthor && !isAdmin
        },
        { 
            name: 'My Favorite', 
            slug: '/my-favorite', 
            active: isNotDashboardActive
        },
        { 
            name: 'Dashboard', 
            slug: '/dashboard', 
            active: isDashboardActive
        },
        {
            name: 'Manage Author',
            slug: '/dashboard/manage-author',
            active: isAdmin && !isDashboardActive
        },
        {
            name: 'Manage Blogs',
            slug: '/manage-blogs',
            active: isAdmin && !isDashboardActive
        },
        { 
            name: 'About', 
            slug: '/about', 
            active: true && isNotDashboardActive
        }
    ];

    useEffect(() => {
        setActiveNav(location.pathname)
    },[navigate]);

    return (
        <div className="fixed top-0 bottom-0 left-0 z-50 flex w-80 flex-col bg-white text-black shadow-2xl py-4">
            <div className="flex pl-8 pr-4 justify-between gap-3 items-center">
                <Link to='/'>
                    <Logo />
                </Link>
                <div>
                    <CloseButton setIsOpen={setIsOpen}/>
                </div>
            </div>
            
            <div className="min-w-full table  ">
                <div className="py-10 pl-8 pr-4">
                    <div className="mx-auto ">
                        <ul className='ml-auto'>
                            {
                                navItems.map(item => (
                                item.active ? (
                                    <li key={item.name} onClick={() => {
                                        setIsOpen(prev => !prev)
                                        navigate(item.slug)
                                    }}
                                    className={` ${activeNav === item.slug  ? 'bg-blue-100' : ''} duration-200 hover:bg-blue-100 rounded-sm py-2`}>
                                        <button
                                        className='inline-bock px-6 py-2'
                                        >{item.name}</button>
                                    </li>
                                ) : null
                                ))
                            }
                            
                        </ul>
                    </div>
                </div>
            </div> 

            
            {
                authStatus && isAuthor || isAdmin && (
                    <div className="mt-auto">
                        <hr className="pb-5"/>
                        <div className="pl-8 pr-4 text-center space-y-3">
                            <div className="w-14 h-14 mx-auto rounded-full overflow-hidden">
                                <img src={userData?.image || placeholderImage} alt="user image" />
                            </div>
                            <div>{isAdmin && 'Admin' || isAuthor && 'Author'}</div>
                            <h3 className="text-sm mb-0">{userData?.email}</h3>
                        </div>   
                    </div>  
                )
            }
           
        </div>
    );
};

export default SideNav;
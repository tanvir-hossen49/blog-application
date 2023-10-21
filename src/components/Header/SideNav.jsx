import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";

const SideNav = ({setIsOpen, authStatus}) => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('');

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "My Posts",
            slug: "/my-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
        {
            name: 'About',
            slug: "/about",
            active: true
        },
    ];

    useEffect(() => {
        setActiveNav(location.pathname)
    },[navigate])

    return (
        <div className="fixed top-0 bottom-0 left-0 z-50 flex w-80 flex-col bg-white text-black shadow-2xl py-4">
            <div className="flex pl-8 pr-4 justify-between gap-3 items-center">
                <Link to='/'>
                    <Logo />
                </Link>
                <div>
                    <button
                        onClick={() => setIsOpen(prev => !prev)} 
                        type="button" aria-label="Close sidebar" data-title="Close sidebar" className="blog-sidebar-close-button tooltip-handle ml-2 rounded-full border border-transparent p-2 font-semibold transition-colors duration-150 focus:outline-none hover:bg-black/10"><svg className="h-5 w-5 fill-current" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>
                    </button>
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
        </div>
    );
};

export default SideNav;
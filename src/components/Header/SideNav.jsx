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

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "My Posts",
            slug: "/my-posts",
            active: authStatus && userData?.isVerified,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus && userData?.isVerified,
        },
        {
            name: "Become An Author",
            slug: "/become-an-author",
            active: true,
        },
        {
            name: 'About',
            slug: "/about",
            active: true
        }
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
                authStatus && (
                    <div className="mt-auto">
                        <hr className="pb-5"/>
                        <div className="pl-8 pr-4 flex flex-wrap items-center gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                <img src={userData?.image || placeholderImage} alt="user image" className=""/>
                            </div>
                            <h3 className="text-sm mb-0">{userData?.email}</h3>
                        </div>   
                    </div>  
                )
            }
           
        </div>
    );
};

export default SideNav;
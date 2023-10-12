import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SideNav = ({setIsOpen}) => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('/')
    const authStatus = useSelector(state => state.auth.status);

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
        <div className="mx-auto ">
            <ul className='ml-auto'>
                {
                    navItems.map(item => (
                    item.active ? (
                        <li key={item.name} onClick={() =>{
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
    );
};

export default SideNav;
import { useSelector } from "react-redux";
import {Container, Logo, LogoutBtn} from '../index';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [active, setActive] = useState('');
    const [isOpen, setIsOpen] = useState(false);

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
    
    const handleNav = () => {
        setIsOpen(prev => !prev)
    }

    useEffect(() => {
        setActive(location.pathname)
    },[navigate])

    return (
        <header className='border-b sticky top-0 z-[1000] block py-3 lg:block'>
            <Container>
                <nav className='flex md:justify-between items-center'>
                    <div className="">
                        <Link to='/'>
                            <Logo width='70px'   />
                        </Link>
                    </div>
                    <div className="hidden md:block mx-auto ">
                        <ul className='flex ml-auto'>
                            {
                                navItems.map(item => (
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                        onClick={() =>{
                                            setActive(item.slug)
                                            navigate(item.slug)
                                        }}
                                        className={`
                                        ${active === item.slug && 'bg-blue-100'}
                                        inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full`}
                                        >{item.name}</button>
                                    </li>
                                ) : null
                                ))
                            }
                            
                        </ul>
                    </div>
                    <div className="flex gap-x-2 ml-auto md:m-0 items-center text-right">
                        <div>
                            {
                                authStatus ? <LogoutBtn /> : (
                                <button
                                onClick={() => {
                                    setActive('login')
                                    navigate('/login')}
                                }
                                className={`
                                ${active === 'login' && 'bg-blue-100'}
                                inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full`}
                                >Log in</button>
                                )
                            }
                        </div>

                        <div className="md:hidden block ml-3">
                            <span className="cursor-pointer" onClick={handleNav}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                            </span>
                        </div>
                    </div>
                </nav>
                {isOpen && (
                    <ul className="lg:none text-center space-y-2 mt-2" >
                        { navItems.map(item => (
                            item.active ? (
                                <li key={item.name} onClick={handleNav}>
                                    <button
                                    onClick={() =>{
                                        setActive(item.slug)
                                        navigate(item.slug)
                                    }}
                                    className={`
                                    ${active === item.slug && 'bg-blue-100'}
                                    inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full`}
                                    >{item.name}</button>
                                </li>
                            ) : null
                            ))
                        }
                    </ul>
                    ) 
                }
            </Container>
        </header>
    );
};

export default Header;
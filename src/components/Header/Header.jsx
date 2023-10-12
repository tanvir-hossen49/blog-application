import { useSelector } from "react-redux";
import {Container, Logo, LogoutBtn} from '../index';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SideNav from "./SideNav";
import BackHomeBtn from "./BackHomeBtn";

const Header = () => {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [isOpen, setIsOpen] = useState(false)
    
    const handleNav = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <header className='border-b sticky top-0 z-[1000] block py-3 lg:block'>
            <Container>
                <nav className='flex justify-between items-center'>
                    <div className="flex items-center gap-2">
                        <div>
                            <BackHomeBtn />
                        </div>
                        <div>
                            <button onClick={handleNav} type="button" aria-label="Menu" data-title="Menu" className="blog-bars-button tooltip-handle flex flex-row items-center rounded-full p-2 transition duration-100 ease-in-out focus:outline-none hover:bg-black/10"><svg className="h-6 w-6 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9889 11.9969H11.9945H3M20.9889 17.8745H3M21 6.12451H3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
                        </div>
                        <Link to='/'>
                            <Logo width='70px'   />
                        </Link>
                    </div>

                    <div className="flex gap-x-2 ml-auto md:m-0 items-center text-right">
                        <div>
                            {
                                authStatus ? <LogoutBtn /> : (
                                <button
                                onClick={() => {
                                    navigate('/login')}
                                }
                                className='
                               bg-blue-400
                                inline-bock text-gray-100 hover:text-black px-6 py-2 duration-300 hover:bg-blue-100 rounded-full'
                                >Log in</button>
                                )
                            }
                        </div>

                        
                    </div>
                </nav>
            </Container>

            {
                isOpen && (
                    <div className="fixed top-0 bottom-0 left-0 z-50 flex w-80 transform flex-col bg-white text-black shadow-2xl duration-300 ease-out translate-x-0 py-4">
                        <div className="flex pl-8 pr-4 justify-between gap-3 items-center">
                            <Link to='/'>
                                <Logo />
                            </Link>
                            <div>
                                <button
                                 onClick={handleNav} 
                                 type="button" aria-label="Close sidebar" data-title="Close sidebar" className="blog-sidebar-close-button tooltip-handle ml-2 rounded-full border border-transparent p-2 font-semibold transition-colors duration-150 focus:outline-none hover:bg-black/10"><svg className="h-5 w-5 fill-current" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg></button>
                            </div>
                        </div>
                        <div className="min-w-full table  ">
                            <div className="py-10 pl-8 pr-4">
                                <SideNav setIsOpen={setIsOpen}/>
                            </div>
                        </div>
                        
                    </div>
                )
            }
        </header>
    );
};

export default Header;
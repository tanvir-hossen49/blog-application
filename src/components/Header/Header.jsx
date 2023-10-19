import { useSelector } from "react-redux";
import {Container, Logo, LogoutBtn, SearchBox} from '../index';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SideNav from "./SideNav";
import BackHomeBtn from "./BackHomeBtn";

const Header = () => {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    const handleNav = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <header className='border-b sticky top-0 z-[1000] block py-3 lg:block'>
            <Container>
                <nav className='flex flex-wrap gap-2 justify-between items-center'>
                    <div className="flex items-center gap-2">
                        <BackHomeBtn />
                        <div>
                            <button onClick={handleNav} type="button" aria-label="Menu" data-title="Menu" className="blog-bars-button tooltip-handle flex flex-row items-center rounded-full p-2 transition duration-100 ease-in-out focus:outline-none hover:bg-black/10"><svg className="h-6 w-6 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9889 11.9969H11.9945H3M20.9889 17.8745H3M21 6.12451H3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
                        </div>
                        <Link to='/'>
                            <Logo width='70px'   />
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-2 md:ml-auto md:m-0 items-center text-right">
                        {/* search button */}
                        {
                            location.pathname === '/' || location.pathname === '/my-post' ? <div>
                                <SearchBox />
                            </div> : null
                        }

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
                isOpen ? (<>
                    <div onClick={handleNav} className="fixed bg-black opacity-60 top-0 bottom-0 left-0 right-0 z-40 "></div>
                    <SideNav setIsOpen={setIsOpen} authStatus={authStatus}/>
                </>) : null
            }
        </header>
    );
};

export default Header;
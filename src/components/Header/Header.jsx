import { useSelector } from "react-redux";
import {Container, Logo, LogoutBtn} from '../index';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className='border-b sticky top-0 z-[1000] block py-3 lg:block'>
            <Container>
                <nav className='flex justify-between items-center'>
                    <div>
                        <Link to='/'>
                            <Logo width='70px'   />
                        </Link>
                    </div>
                    <div>
                        <ul className='flex ml-auto'>
                            {
                                navItems.map(item => (
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                        >{item.name}</button>
                                    </li>
                                ) : null
                                ))
                            }
                            
                        </ul>
                    </div>
                    <div>
                        {
                            authStatus ? <LogoutBtn/> : (
                            <button
                            onClick={() => navigate('/login')}
                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                            >Log in</button>
                            )
                        }
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;
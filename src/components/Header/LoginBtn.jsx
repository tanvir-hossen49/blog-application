import { useNavigate } from "react-router-dom"
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from "react-redux";

const LogoutBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout());
            navigate('/login')
        }).catch(error => {
            console.log(error);
        })
    }

    return <button 
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={handleLogout}
    >log out</button>
};

export default LogoutBtn;
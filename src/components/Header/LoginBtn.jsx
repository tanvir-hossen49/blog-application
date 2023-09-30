import { useNavigate } from "react-router-dom"
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from "react-redux";

const LogoutBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
        }).catch(error => {
            console.log(error);
        })
    }

    return <button>log out</button>
};

export default LogoutBtn;
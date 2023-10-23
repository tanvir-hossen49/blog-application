import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Protected = ({ children, authentication = true }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const authState = useSelector(state => state.auth.status);

    useEffect(() => {
        if(authentication && authState !== authentication) {
            navigate('/login');
        } else if(!authentication && authState !== authentication) {
            navigate('/');
        }
        setLoading(false);
    }, [authentication, navigate, authState])

    return loading ? <Loader />  : <> {children} </>
};

export default Protected;
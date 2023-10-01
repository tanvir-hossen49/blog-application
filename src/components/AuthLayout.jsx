import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        setLoading(false)
    }, [authentication, navigate, authState])

    return loading ? <h1>Loading....</h1> : <> {children} </>
};

export default Protected;
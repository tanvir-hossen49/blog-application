import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../components";
import { Outlet } from "react-router-dom";
import authService from "../appwrite/auth";
import { isAuthor } from "../utilities/isAuthor";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  
  const userData = useSelector(state => state.auth.userData);
  const isAlreadyLoggedIn = userData?.role === 'author';

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('re-rander from dashboard');
      try {
        const userData = await authService.getCurrentUser();
        await isAuthor(userData, dispatch);
      } catch (error) {
        setError(true);
        console.log('get current user :: error ::', error);
      } finally {
        setLoading(false);
      }
    };

    if(!isAlreadyLoggedIn) fetchUserData();
    else setLoading(false);
  }, [dispatch, isAlreadyLoggedIn]);

  if(error) return <h1>Something went wrong</h1>

  return !loading ? (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header />
        <main>
          <Outlet />
        </main>
    </div>
  ) : null;
}

export default Dashboard;

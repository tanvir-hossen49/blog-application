import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Header, Footer, Loader } from './components/index';
import authService from './appwrite/auth.js';
import './App.css';
import { isAuthor } from './utilities/isAuthor';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    userData === null ? (async () => {
      try {
        const userData = await authService.getCurrentUser();
        await isAuthor(userData, dispatch);
      } catch (error) {
        setError(true);
        console.log('get current user :: error ::', error);
      } finally {
        setLoading(false);
      }
    })() : setLoading(false)
  }, [dispatch, userData]);

  if(error) return <h1>Something went wrong</h1>

  return !loading ? (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
}

export default App;

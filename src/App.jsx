import { useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import authService from './appwrite/auth.js';
import config from './appwrite/config'
import { login, logout } from './store/authSlice';
import {Header, Footer } from './components/index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then(userData => {
      if(userData) {
        config.getAuthor(userData?.$id).then(author => {
          if(author) {
            const {isVerified, image, facebookLink, linkedinLink, role, bio, gender} = author;
            dispatch(login({...userData, isVerified, image, facebookLink, linkedinLink, gender, role, bio}))
          } else {
            dispatch(login(userData));
          }
        })
      } else{
        dispatch(logout());
      }
    }).catch(error => {
      dispatch(logout());
      console.log('get current user :: error ::', error)
    }).finally(() => {
      setLoading(false);
    })
  }, [dispatch])

  return !loading ? (
    <div className='flex flex-col justify-between min-h-screen'>
      <Header/>
        <main>
          <Outlet/>
        </main>
      <Footer/>
    </div>
  ) : null
}

export default App

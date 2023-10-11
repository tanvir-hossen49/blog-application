import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.jsx';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
        <Analytics />
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
)

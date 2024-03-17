import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './index.css';
import { AuthContextProvider } from './context/AuthContext.jsx';

const isLoggedIn = localStorage.getItem('isLoggedIn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider initialIsLoggedIn={Boolean(isLoggedIn)}>
      <App />
      <ToastContainer position="top-center" className={'toast-message'} />
    </AuthContextProvider>
  </React.StrictMode>
);

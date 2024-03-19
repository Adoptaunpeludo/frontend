import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './index.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { AnimalImagesContextProvider } from './context/AnimalImagesContext.jsx';

const isLoggedIn = localStorage.getItem('isLoggedIn');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider initialIsLoggedIn={Boolean(isLoggedIn)}>
      <AnimalImagesContextProvider>
        <App />
      </AnimalImagesContextProvider>
    </AuthContextProvider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </React.StrictMode>
);

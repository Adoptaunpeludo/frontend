import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './index.css';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { AnimalImagesContextProvider } from './context/AnimalImagesContext.jsx';

import { ModalContextProvider } from './context/ModalContext.jsx';
import { WebSocketContextProvider } from './context/WebSocketContext.jsx';

const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider initialIsLoggedIn={isLoggedIn}>
      <AnimalImagesContextProvider>
        <ModalContextProvider>
          <WebSocketContextProvider>
            <App />
          </WebSocketContextProvider>
        </ModalContextProvider>
      </AnimalImagesContextProvider>
    </AuthContextProvider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </React.StrictMode>
);

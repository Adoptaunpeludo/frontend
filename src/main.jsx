// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './index.css';
import { AnimalImagesContextProvider } from './context/AnimalImagesContext.jsx';
import { ModalContextProvider } from './context/ModalContext.jsx';
import { WebSocketContextProvider } from './context/WebSocketContext.jsx';
import { NotificationsContextProvider } from './context/NotificationsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <WebSocketContextProvider>
      <NotificationsContextProvider>
        <AnimalImagesContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </AnimalImagesContextProvider>
      </NotificationsContextProvider>
    </WebSocketContextProvider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </>
);

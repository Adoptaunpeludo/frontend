import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './index.css';
import { AnimalImagesContextProvider } from './context/AnimalImagesContext.jsx';
import { ModalContextProvider } from './context/ModalContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimalImagesContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </AnimalImagesContextProvider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </React.StrictMode>
);

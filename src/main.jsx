// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './index.css';
import { AnimalImagesContextProvider } from './context/AnimalImagesContext.jsx';
import { ModalContextProvider } from './context/ModalContext.jsx';
import { AdoptionChatContextProvider } from './context/AdoptionChatContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AdoptionChatContextProvider>
      <AnimalImagesContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </AnimalImagesContextProvider>
    </AdoptionChatContextProvider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </>
);

import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';
import './index.css';
import { AnimalImagesContextProvider } from './context/AnimalImagesContext.jsx';
import { ModalContextProvider } from './context/ModalContext.jsx';
import { WebSocketContextProvider } from './context/WebSocketContext.jsx';
import { NotificationsContextProvider } from './context/NotificationsContext.jsx';

const isLoggedIn = localStorage.getItem('isLoggedIn');
localStorage.setItem('isFirstLoad', isLoggedIn === null);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GoogleOAuthProvider clientId="158620306115-psjd1a4oei4ustp9mach8b74m7i8pdfh.apps.googleusercontent.com">
      <WebSocketContextProvider>
        <NotificationsContextProvider>
          <AnimalImagesContextProvider>
            <ModalContextProvider>
              <App />
            </ModalContextProvider>
          </AnimalImagesContextProvider>
        </NotificationsContextProvider>
      </WebSocketContextProvider>
    </GoogleOAuthProvider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  AppLayout,
  CatsPage,
  DogsPage,
  ErrorPage,
  LandingPage,
  LoginPage,
  RegisterPage,
  SheltersPage,
} from './pages/index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
            // action:
          },
          {
            path: 'login',
            element: <LoginPage />,
            // action:
          },
          {
            path: 'cats',
            element: <CatsPage />,
          },
          {
            path: 'dogs',
            element: <DogsPage />,
          },
          {
            path: 'shelters',
            element: <SheltersPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </React.StrictMode>
);

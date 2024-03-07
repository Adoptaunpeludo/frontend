import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";

//Auth
//import { AuthContextProvider } from "./pages/Auth/AuthContextProvider.jsx";
//import { setAuthorizationHeader } from './api/client.js'







ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*<AuthContextProvider initiallyLogged={!!accessToken}>*/}
      <App />
    {/*</AuthContextProvider>*/}

    <ToastContainer position="top-center" className={"toast-message"} />
  </React.StrictMode>
);

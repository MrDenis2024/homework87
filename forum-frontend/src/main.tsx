import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer position="bottom-right" />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { jwtDecode } from 'jwt-decode';

const root = ReactDOM.createRoot(document.getElementById('root'));

const logOut=()=>{
  localStorage.removeItem('token');
  window.location.reload();
}

const token = localStorage.getItem('token');
if(token){
  const decodeToken = jwtDecode(token);
  const expTime = decodeToken.exp*1000-Date.now();

  setTimeout(()=>{
    alert("Session Timeout!")
    logOut();
  },expTime)
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


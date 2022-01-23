import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import reportWebVitals from './reportWebVitals';
import AuthGuarded from './components/AuthGuarded';
import Unguarded from './components/Unguarded';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UsersIndex from './pages/Users/Index';

ReactDOM.render(
    <React.StrictMode>
        <App>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthGuarded><Dashboard /></AuthGuarded>} />
                    <Route path="/login" element={<Unguarded><Login /></Unguarded>} />
                    <Route path="/forgotPassword" element={<Unguarded><ForgotPassword /></Unguarded>} />
                    <Route path="/resetPassword/:token" element={<Unguarded><ResetPassword /></Unguarded>} />
                    <Route path="/profile" element={<AuthGuarded><Profile /></AuthGuarded>} />
                    <Route path="/users" element={<AuthGuarded><UsersIndex /></AuthGuarded>} />
                </Routes>
            </BrowserRouter>
        </App>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

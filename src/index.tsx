import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuarded from "./components/AuthGuarded";
import Unguarded from "./components/Unguarded";

ReactDOM.render(
	<React.StrictMode>
		<App>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthGuarded><Dashboard /></AuthGuarded>} />
					<Route path="/login" element={<Unguarded><Login /></Unguarded>} />
				</Routes>
			</BrowserRouter>
		</App>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

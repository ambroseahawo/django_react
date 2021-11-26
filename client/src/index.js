import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import App from './App';
import './index.css';

const RouterFunc = () => {
  return(
    <CookiesProvider>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/articles" element={<App/>} />
      </Routes>
    </CookiesProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RouterFunc />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

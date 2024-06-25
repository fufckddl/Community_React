import './App.css';
import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import MainPage from './component/MainPage';

function App() {
  return (
  <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<MainPage />}/>
      </Routes>
    </Router> 
  );
}

export default App;

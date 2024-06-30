import './App.css';
import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import MainPage from './component/MainPage';
import WritePost from './component/post/WritePost';
import MyPost from './component/post/MyPost';
import AllPost from './component/post/AllPost';
import PostDetails from './component/post/PostDetails';

function App() {
  return (
  <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<MainPage />}/>
        <Route path='/writepost' element={<WritePost />} />
        <Route path='/mypost' element={<MyPost />}/>
        <Route path='/allpost' element={<AllPost />} />
        <Route path='/post/:id' element={<PostDetails />} />
      </Routes>
    </Router> 
  );
}

export default App;

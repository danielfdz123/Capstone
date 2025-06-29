import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from '../Pages/Login';
import SignUp from '../Pages/Signup';
import Home from '../Pages/Home';

const App = () => {
  return (
    <div className = "App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Login/>} />
          <Route path = '/signup' element = {<SignUp/>} />
          <Route path = '/home' element = {<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './Pages/Login.jsx';
import SignUp from './Pages/Signup';
import Home from './Pages/Home';
// import Navbar from '../Components/Navbar.jsx';
import Fitness from './Pages/Fitness';
import Diet from './Pages/Diet.jsx';
import History from './Pages/History.jsx';
import Social from './Pages/Social.jsx';
import Setup from './Pages/Setup.jsx';
import Account from './Pages/Account.jsx';

function App() {

  return (
    <div className = "App">
      <BrowserRouter>
      {/* <Navbar/> */}
        <Routes>
          <Route path = '/' element = {<Login/>} />
          <Route path = '/signup' element = {<SignUp/>} />
          <Route path = '/home' element = {<Home/>} />
          <Route path = "/fitness" element={<Fitness />} />
          <Route path = "/diet" element={<Diet />} />
          <Route path = "/history" element={<History />} />
          <Route path = "/social" element={<Social />} />
          <Route path = "/setup" element={<Setup />} />
          <Route path = "/account" element = {<Account/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './Navbar.jsx';
import Home from './pages/Home.jsx';
import Fitness from './pages/Fitness.jsx';
import Diet from './pages/Diet.jsx';
import History from './pages/History.jsx';
import Social from './pages/Social.jsx';


function App() {

  return (
  <>
  <Router>
    <Navbar />
    <div className="content-container">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fitness" element={<Fitness />} />
      <Route path="/diet" element={<Diet />} />
      <Route path="/history" element={<History />} />
      <Route path="/social" element={<Social />} />
    </Routes>
    </div>
  </Router>
  </>
  );
 
}

export default App;
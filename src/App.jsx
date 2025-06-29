import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar.jsx'

function App() {

  return (
  <>
    <Navbar></Navbar>

    <div className="content-container">
      <div className="box1"> User Info </div>
      <div className="box2"> Weekly Plan </div>
      <div className="box3"> Workout Recs </div>
    </div>
  </>
  );
 
}

export default App;

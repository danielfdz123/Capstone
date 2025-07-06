import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

import './Home.css';
import Navbar from '../Components/Navbar';
const Home = () => {
    return (
        <div className="homeBox">
            <div className = "navDiv">
                <Navbar />
            </div>
            <div className = "box1"> Home </div>
            <div className = "box2"> </div>
            <div className = "box3"> </div>
        </div>
    );
};

export default Home;
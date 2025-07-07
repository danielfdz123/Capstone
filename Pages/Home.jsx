import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

import './Home.css';
import Navbar from '../Components/Navbar';

const Home = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const navigate = useNavigate();
    const [userFirstName, setUserFirstName] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) 
        {
            const parsedUser = JSON.parse(storedUser);
            setUserFirstName(parsedUser.first_name || parsedUser.username || 'User');
        }
    }, []);


    return (
        <div className="homeBox">
            {/* IMPORT NAVBAR COMPONENT */}
            <div className = "navDiv">
                <Navbar />
            </div>

            {/* WELCOME TEXT */}
            <div className = "content">
                <div className = "intro">
                    <h1> Welcome {userFirstName}! </h1>
                    <p> Time to lock in! No pain, no gain! </p>
                    <input
                        type = "date"
                        className = "calendar"
                        value = {selectedDate}
                        onChange = {(e) => setSelectedDate(e.target.value)}
                    />
                </div>
                
                <div className = "cardInfoDiv">
                    {/* CALORIES INFO */}
                    <div className = "card">
                        <h3> Calories Remaining </h3>
                        <h2> 2000 </h2>
                        <p> Goal: 2000 | Consumed: 0 | 1Burned: 0</p>
                        <div className = "progressBar">
                            {/* Need to figure out how to make this work, would be cool tbh */}
                        </div>
                    </div>

                    {/* EXERCISE COUNT INFO */}
                    <div className = "card">
                        <h3> Exercise Today </h3>
                        <h2> 0 </h2>
                        <p> 0 workouts completed</p>
                    </div>

                    {/* WEIGHT PROGRESS INFO */}
                    <div className = "card">
                        <h3> Weight Progress</h3>
                        <h2> -- lbs</h2>
                        <p> Complete your profile to track progress </p>
                        <div className = "progressBar">
                            {/* Need to figure out how to make this work, would be cool tbh */}
                        </div>
                    </div>
                </div>

                <div className="quickLinks">
                    <button onClick = {() => navigate('/diet')}> Log Food 🍽 </button>
                    <button onClick = {() => navigate('/fitness')}> Log Exercise 🏃 </button>
                    <button onClick = {() => navigate('/social')}> Friends 👥 </button>
                </div>

                <div className = "summaryDiv">
                    <h3> Daily Summary </h3>
                    <p> No meals logged yet. Start by logging your first meal! </p>
                    <div className = "summary">
                        <span> Total </span>
                        <span className = "totalCal">0 cal</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
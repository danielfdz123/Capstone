import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

import './Home.css';
import Navbar from '../Components/Navbar';

const Home = () => {
    const [selectedDate, setSelectedDate] = useState('');    
    const navigate = useNavigate();
    const [userFirstName, setUserFirstName] = useState('');
    const [calorieGoal, setCalorieGoal] = useState('');
    const [weight, setCurrentWeight] = useState('');
    const [weightGoal, setWeightGoal] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [exerciseCount, setExerciseCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = JSON.parse(storedUser);
        const username = parsedUser.username;
        const modalFlagKey = `homeModalShown_${username}`;
        const modalShown = localStorage.getItem(modalFlagKey);
        if (!modalShown) 
        {
            setShowModal(true);
            localStorage.setItem(modalFlagKey, 'true');
        }
        const today = new Date();
        const date = today.toLocaleDateString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'America/New_York'
        });
        setSelectedDate(date);

        const fetchStats = async () => {
            const { username } = JSON.parse(storedUser);
            const { data, error } = await supabase
            .from('Stats')
            .select('*')
            .eq('username', username)
            .single();
            if (error) 
            {
                console.error('Error fetching stats:', error);
                return;
            }
            if (data) 
            {
                setUserFirstName(data.first_name || 'User');
                setCalorieGoal(data.calorieGoal || 0 );
                setCurrentWeight(data.currentWeight);
                setWeightGoal(data.weightGoal);
            }
        };
        fetchStats();

        const fetchExerciseCount = async () => {
            const { username } = JSON.parse(storedUser);
            const todaysDate = new Date().toISOString().split('T')[0];
            const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const { data, error } = await supabase
                .from('Exercise')
                .select('id')
                .eq('username', username)
                .gte('date', todaysDate)
                .lt('date', tomorrowDate);
            if (!error && data) 
            {
                setExerciseCount(data.length);
            }
        };
        fetchExerciseCount();
        }, []);

    return (
    <>
        {/* WELCOME MESSAGE - Only shows once per new account */}
        {showModal && (
        <div className = "welcomeDiv">
          <div className = "welcomeMsg">
            <h1>🎉 Welcome to FitFormula! 🎉 </h1>
            <p> Be sure to click the circle icon in the top right to finish setting up your account! </p>
            <p> Feel free to update any values like weight/calories in your account settings so they align with your goals! </p>
            <p> Thank you for signing up, we look forward to seeing your fitness journey! 💪 </p>
            <button onClick={() => setShowModal(false)}> Lets Go! </button>
          </div>
        </div>
      )}

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
                    <h6 className = "calendarText"> 📅 {selectedDate} </h6>
                </div>
                
                <div className = "cardInfoDiv">
                    {/* CALORIES INFO */}
                    <div className = "card">
                        <h3> Calories Remaining: </h3>
                        <h2> 2100 </h2>
                        <p> Goal: {calorieGoal} | Consumed: 0 </p>
                        <div className = "progressBar">
                            {/* Need to figure out how to make this work, would be cool tbh */}
                        </div>
                    </div>

                    {/* EXERCISE COUNT INFO */}
                    <div className = "card">
                        <h3> Exercises Today: </h3>
                        <h2> {exerciseCount} </h2>
                        <p>{exerciseCount} {exerciseCount === 1 ? 'Workout' : 'Workouts'} Completed</p>
                    </div>

                    {/* WEIGHT PROGRESS INFO */}
                    <div className = "card">
                        <h3> Weight Progress: </h3>
                        <h2> {weight} lbs</h2>
                        <p> Weight Goal: {weightGoal} lbs</p>
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
    </>
    );
};

export default Home;
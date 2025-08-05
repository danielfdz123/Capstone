import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

import './Fitness.css';
import Navbar from '../Components/Navbar';
import ExerciseForm from '../Components/ExerciseForm';

const Fitness = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [username, setUsername] = useState('');
    const [exerciseCount, setExerciseCount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : {};
        const username_ = parsedUser.username || '';
        setUsername(username_);

        const modalFlagKey = `fitnessModalShown_${username_}`;
        const modalShown = localStorage.getItem(modalFlagKey);
        if (!modalShown && username_) 
        {
            setShowModal(true);
            localStorage.setItem(modalFlagKey, 'true');
        }

        const today = new Date();
        const date = today.toLocaleDateString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/New_York'
        });
        setSelectedDate(date);
        
        // Range of the 24-Hour time frame for the daily workout records that'll be present on this page
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

        const fetchExercise = async () => {
            const { data, error } = await supabase
                .from('Exercise')
                .select('id')
                .eq('username', username_)
                .gte('date', startOfDay)
                .lte('date', endOfDay);

            if (!error && data) {
                setExerciseCount(data.length);
            }
        };

        if (username_) fetchExercise();
    }, []);

    const handleExerciseLogged = (count) => {
        setExerciseCount(count);
    };

    return (
        <>
            {/* WELCOME MESSAGE - Only shows once per new account */}
            {showModal && (
                <div className = "welcomeDiv">
                    <div className = "welcomeMsg">
                        <h1> 💪 Welcome to the Fitness Page! 💪 </h1>
                        <p> Here is where you can log your daily workouts! </p>
                        <p> Simply follow the form below and start logging! </p>
                        <p> But be sure to save your logs as you go! </p>
                        <button onClick={() => setShowModal(false)}> Got it! </button>
                    </div>
                </div>
            )}

            <div className = "fitnessBox">
                {/* IMPORT NAVBAR COMPONENT */}
                <div className = "navDiv">
                    <Navbar />
                </div>

                {/* CONTENT TEXT */}
                <div className = "fitnessContent">
                    <h3 className = "intro"> Today is {selectedDate}, and you have {exerciseCount} {exerciseCount !== 1 ? 'workouts' : 'workout'} logged! </h3>
                    <p> Use the chart below to start logging your workouts! </p>
                    <ExerciseForm username={username} onExerciseLogged={handleExerciseLogged} />
                </div>
            </div>
        </>
    );
};

export default Fitness;
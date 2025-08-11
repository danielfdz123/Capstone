import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import HistoryChart from '../../Components/HistoryChart';
import { supabase } from '../client';
import './History.css';

const History = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [workoutDays, setWorkoutDays] = useState([]);                     // All workoutDays from the account in the database
    const [selectedWorkoutDay, setSelectedWorkoutDay] = useState('');       // The selected workout day in the dropdown
    const [latestWorkoutDateText, setlatestWorkoutDateText] = useState(''); // Most recent workout

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : {};
        const username_ = parsedUser.username || '';
        setUsername(username_);

        const modalFlagKey = `historyModalShown_${username_}`;
        const modalShown = localStorage.getItem(modalFlagKey);
        if (!modalShown && username_) 
        {
            setShowModal(true);
            localStorage.setItem(modalFlagKey, 'true');
        }
        
        const fetchExercise = async () => {
            const { data: days } = await supabase
                .from('Exercise')
                .select('workoutDay', { distinct: true })
                .eq('username', username_)
            
            // Creates array and fills it with a list of names of workout days present in the table
            const unique = Array.from(new Set((days || []).map(d => (d.workoutDay || '').trim())))
                .filter(Boolean)
                .sort();
            setWorkoutDays(unique);

            // Fetches info from most recent workout when loading the history page
            const { data: recentWorkout } = await supabase
                .from('Exercise')
                .select('date, workoutDay')
                .eq('username', username_)
                .order('date', { ascending: false })
                .limit(1);
            
            // UI shows recent workout in EST
            if (recentWorkout?.length) 
            {
                const latestWorkout = recentWorkout[0];
                setSelectedWorkoutDay(latestWorkout.workoutDay || '');
                setSelectedDate(
                    new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date(latestWorkout.date))
                );
                setlatestWorkoutDateText(
                    new Date(latestWorkout.date).toLocaleString('en-US', 
                    {
                        weekday: 'long', 
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric', 
                        timeZone: 'America/New_York',
                    })
                );
            }
        };
        fetchExercise();
    }, []);

    // History changes according to the dropdown selection (Ex: Chest Day, Leg Day, etc)
    const handleWorkoutDayChange = async (e) => {
        const day = e.target.value;
        setSelectedWorkoutDay(day);
        const { data } = await supabase
            .from('Exercise')
            .select('date')
            .eq('username', username)
            .eq('workoutDay', day)
            .order('date', { ascending: false })
            .limit(1);

        if (data?.length) 
        {
            const workoutDate = new Date(data[0].date);
            setSelectedDate(
                new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(workoutDate));
            setlatestWorkoutDateText(
                workoutDate.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                timeZone: 'America/New_York',
                })
            );
        }
    };

    return (
        <>
            {/* WELCOME MESSAGE - Only shows once per new account */}
            {showModal && (
                <div className = "welcomeDiv">
                    <div className = "welcomeMsg">
                        <h1>📁 Welcome to the History Page! 📁 </h1>
                        <p> View all your past workouts here! </p>
                        <p> Either navigate through the dates to view your workouts for set days </p>
                        <p> Or hit the dropdown to see when you last did a speficic workout! </p>
                        <p> For new users, nothing will show so get to work and log your first workout! </p>
                        <button onClick={() => setShowModal(false)}> Sounds Good! </button>
                    </div>
                </div>
            )}

            <div className = "historyBox">
                {/* IMPORT NAVBAR COMPONENT */}
                <div className = "navDiv">
                    <Navbar />
                </div>

                {/* CONTENT TEXT */}
                <div className = "historyContent">
                    <h3 className = "intro">
                        {selectedWorkoutDay && latestWorkoutDateText? 
                        <> Your most recent workout was{' '}
                            <select className = "daySelect" value={selectedWorkoutDay} onChange={handleWorkoutDayChange}>
                                {workoutDays.map(day => <option key={day} value={day}>{day}</option>)}
                            </select>{' '}on {latestWorkoutDateText}.
                        </>
                        : 'No workouts logged yet. Start by logging your very first exercise!'}
                    </h3>
                    <HistoryChart username={username} selectedDate = {selectedDate} onSelectedDateChange={setSelectedDate}/>
                </div>
            </div>
        </>
    );
};

export default History;
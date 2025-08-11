import React, { useState, useEffect } from 'react';
import './HistoryChart.css';
import { supabase } from '../src/client';

const HistoryChart = ({ username, selectedDate, onSelectedDateChange, onDayCount }) => {
    const [exerciseList, setExerciseList] = useState([]);

    useEffect(() => {
    if (!username || !selectedDate) {
        onDayCount?.(null);
        setExerciseList([]);
        return;
    }

    const startTime = new Date(`${selectedDate}T00:00:00-05:00`);
    const endTime = new Date(startTime);
    endTime.setDate(endTime.getDate() + 1);

    const fetchExercises = async () => {
        const { data, error } = await supabase
            .from('Exercise')
            .select()
            .eq('username', username)
            .gte('date', startTime.toISOString())
            .lt('date', endTime.toISOString())
            .order('date', { ascending: true });

        const rows = !error && Array.isArray(data) ? data : [];
        setExerciseList(rows);
        onDayCount?.(rows.length); 
    };
    fetchExercises();
    }, [username, selectedDate]);

    return (
        <div className = "main-layout">
            <div className = "exercise-container">
                <h2 className = "exercise-heading"> 📊 Exercise History </h2>

                {/* CALENDAR */}
                <h4 className = "exerciseDay">
                    Change Date: &nbsp;
                    <input
                        type = "date"
                        className = "calendar"
                        value = {selectedDate || ''}
                        onChange = {(e) => onSelectedDateChange?.(e.target.value)}
                    />
                </h4>

                {/* HISTORY CONTENT */}
                {exerciseList.length === 0 ? (
                <div className = "nothingLogged">
                    <h2> No workouts logged for this date. </h2>
                </div>
                ) : (
                exerciseList.map((ex, index) => (
                    <div className = "exerciseHistoryChart" key={index}>
                        <div className = "exerciseName"> {ex.exercise} </div>
                        <div className = "exerciseSets"> {ex.sets} {ex.sets === 1 ? 'set' : 'sets'} </div>
                        <div className = "exerciseReps"> Reps: {Array.isArray(ex.reps) ? ex.reps.join(', ') : ex.reps} </div>
                        <div className = "exerciseWeight"> {Array.isArray(ex.weight) ? ex.weight.join(', ') : ex.weight} lbs </div>
                    </div>
                )))}
            </div>
        </div>
    );
};

export default HistoryChart;
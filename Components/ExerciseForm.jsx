import React, { useState, useEffect } from 'react';
import './ExerciseForm.css';
import { supabase } from '../client';

const normalizeName = (name) => name.trim().replace(/[\s-]+/g, ' ');

const ExerciseForm = ({ username, onExerciseLogged }) => {
    const [exerciseDay, setExerciseDay] = useState('');
    const [exercise, setExercise] = useState({ name: '', sets: 1, reps: '', weight: '' });
    const [setDetails, setSetDetails] = useState([]);
    const [exerciseList, setExerciseList] = useState([]);

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    useEffect(() => {
        // Gets any exercise within this current day, ranging 24-hours
        const fetchTodayExercises = async () => {
            if (!username) return;
            const { data, error } = await supabase
                .from('Exercise')
                .select()
                .eq('username', username)
                .gte('date', formattedDate)
                .lt('date', new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
            if (!error) {
                setExerciseList(data);
            }
        };
        fetchTodayExercises();
    }, [username]);

    const handleChange = (e) => {
        setExercise({ ...exercise, [e.target.name]: e.target.value });
    };

    const handleNextSet = (e) => {
        e.preventDefault();
        const { name, reps, weight } = exercise;
        if (!name || !reps || !weight) {
            alert('Finish your current set before moving onto the next one.');
            return;
        }
        if (!exerciseDay.trim()) {
            alert('Specify what your workout day is before moving on.');
            return;
        }
        setSetDetails([...setDetails, { reps, weight }]);
        setExercise({
            ...exercise,
            sets: exercise.sets + 1,
            reps: '',
            weight: ''
        });
    };

    const handleNextExercise = async (e) => {
        e.preventDefault();
        const { name } = exercise;
        if (!name || setDetails.length === 0) {
            alert('Please enter at least one complete set before moving onto the next exercise!');
            return;
        }
        if (!exerciseDay.trim()) 
        {
            alert('Please enter a workout day before adding an exercise!');
            return;
        }

        const exerciseName = normalizeName(name);
        const reps = setDetails.map(s => parseFloat(s.reps));
        const weight = setDetails.map(s => parseFloat(s.weight));
        const sets = setDetails.length;

        const newExercise = {
            username,
            date: new Date().toISOString(),
            workoutDay: exerciseDay,
            exercise: exerciseName,
            sets,
            reps,
            weight
        };

        const { error } = await supabase.from('Exercise').insert(newExercise);
        if (error) {
            console.error('Insert error:', error);
        } else {
            const updatedList = [...exerciseList, newExercise];
            setExerciseList(updatedList);
            setExercise({ name: '', sets: 1, reps: '', weight: '' });
            setSetDetails([]);
            if (onExerciseLogged) onExerciseLogged(updatedList.length);
        }
    };

    return (
        <div className = "main-layout">
            <div className = "exercise-container">
                <h2 className = "exercise-heading">🏋️ Add Exercise </h2>

                {/* ADDING EXERCISE CONTENT  */}
                <h4 className = "exerciseDay">
                    Today is:
                    <input
                        className = "exercise-input"
                        placeholder = "Ex: Chest Day"
                        value = {exerciseDay}
                        onChange = {(e) => setExerciseDay(e.target.value)}
                        required
                        readOnly = {exercise.sets > 1}
                    />
                </h4>


                <form className = "exercise-form">                    
                    <input
                        className = "exercise-input"
                        type = "text"
                        name = "name"
                        placeholder = "Exercise Name"
                        value = {exercise.name}
                        onChange = {handleChange}
                        required
                        readOnly = {exercise.sets > 1}
                    />
                    <input
                        className = "exercise-input"
                        type = "text"
                        name = "sets"
                        value = {`Set #${exercise.sets}`}
                        readOnly
                    />
                    <input
                        className = "exercise-input"
                        type = "number"
                        name = "reps"
                        placeholder = {setDetails.length > 0 ? `Previous Rep: ${setDetails.at(-1).reps}` : "Reps"}
                        value = {exercise.reps}
                        onChange = {handleChange}
                        required
                    />
                    <input
                        className = "exercise-input"
                        type = "number"
                        name = "weight"
                        placeholder = {setDetails.length > 0 ? `Previous Weight: ${setDetails.at(-1).weight}lbs` : "Weight (lbs)"}
                        value = {exercise.weight}
                        onChange = {handleChange}
                        required
                    />
                    <button className = "nextSet" type = 'submit' onClick={handleNextSet}>Next Set</button>
                    <button className = "nextExercise" type = 'submit' onClick={handleNextExercise}>Next Exercise</button>
                </form>

                {/* HISTOTY CONTENT  */}
                {exerciseList.map((ex, index) => (
                    <div className = "exerciseHistory" key={index}>
                        <div className = "exerciseName"> {ex.exercise} </div>
                        <div className = "exerciseSets"> {ex.sets} {ex.sets === 1 ? 'set' : 'sets'} </div>
                        <div className = "exerciseReps"> Reps: {Array.isArray(ex.reps) ? ex.reps.join(', ') : ex.reps} </div>
                        <div className = "exerciseWeight"> {Array.isArray(ex.weight) ? ex.weight.join(', ') : ex.weight} lbs </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseForm;
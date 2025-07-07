// Pages/History.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import './History.css';

const History = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        // Sample data for now (temporary)
        const testData = [
            {
                _id: "1",
                date: "2025-07-01",
                exerciseName: "Bench Press",
                sets: 3,
                reps: 10,
                duration: 45
            },
            {
                _id: "2",
                date: "2025-07-02",
                exerciseName: "Squats",
                sets: 4,
                reps: 8,
                duration: 50
            }
        ];
        setWorkouts(testData);
    }, []);

    return (
        <div className="historyBox">
            <div className="navDiv">
                <Navbar />
            </div>
            <div className="history-container">
                <h2>Workout History</h2>
                <table className="workout-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Exercise</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Duration (mins)</th>
                        </tr>
                    </thead>
                    <tbody>
  {workouts.length > 0 ? (
    workouts.map(workout => (
      <tr key={workout._id}>
        <td>{new Date(workout.date).toLocaleDateString()}</td>
        <td>{workout.exerciseName}</td>
        <td>{workout.sets}</td>
        <td>{workout.reps}</td>
        <td>{workout.duration}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No workouts logged yet! 💪</td>
    </tr>
  )}
</tbody>

                </table>
            </div>
        </div>
    );
}

export default History;

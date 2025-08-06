// Pages/History.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import {supabase} from '../client';
import './History.css';

const History = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewWorkout, setViewWorkout] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            setLoading(true);
            const {data, error} = await supabase
                .from('workouts')
                .select('*')
                .order('date', {ascending: false});

            if (error) {
                console.error("Error fetching workouts:", error);
            } else {
                setWorkouts(data);
            }
            setLoading(false); 
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="historyBox">
            <div className="navDiv">
                <Navbar />
            </div>

            <div className="history-container">
                <h2> Workout History </h2>
                {loading ? (
          <p> Loading workouts... </p>
        ) : workouts.length === 0 ? (
          <p> No workouts logged yet! </p>
        ) : (
          <table className="workout-table">
            <thead>
              <tr>
                <th> Date </th>
                <th> # Exercises </th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id || workout._id}>
                  <td> {new Date(workout.date).toLocaleDateString()} </td>
                  <td> {workout.exercises?.length || 0} </td>
                  <td>
                    <button onClick={() => setViewWorkout(workout)}> View </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Modal to display the entire workout after clicking the "View" button */}
        {viewWorkout && (
          <div className="modal-backdrop" onClick={() => setViewWorkout(null)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Workout on {new Date(viewWorkout.date).toLocaleDateString()}</h3>
              <button className="close-button" onClick={() => setViewWorkout(null)}>
                Close
              </button>
              <ul>
                {viewWorkout.exercises.map((ex, idx) => (
                  <li key={idx}>
                    <strong> {ex.name} </strong>: {ex.sets} sets x {ex.reps} reps{' '}
                    {ex.weight ? `@ ${ex.weight} lb` : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
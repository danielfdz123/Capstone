import React, {useState} from 'react';
import './ExerciseForm.css';

const ExerciseForm = () => {
    const [exercise, setExercise] = useState({name: '', sets: '', reps: '', weight: ' '});
    const [exerciseList, setExerciseList] = useState([]);

    const handleChange = (e) => {
        setExercise({...exercise, [e.target.name]: e.target.value});
    };

    const handleAddExercise = (e) => {
        e.preventDefault();
        const {name, sets, reps, weight} = exercise;
        if (!name || !sets || !reps) {
            alert('Please fill in all fields');
            return;
        }

        const today = new Date();
        const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`; // Format date as MM/DD/YYYY
        
        const newExercise = {
            ...exercise,
            date: formattedDate,
        }

        setExerciseList([...exerciseList, newExercise]);
        setExercise({name: '', sets: '', reps: '', weight: ''});
    };

    const handleDelete = (index) => {
        const updatedList = [...exerciseList];
        updatedList.splice(index, 1);
        setExerciseList(updatedList);
    }

    return (
        <div className="exercise-container">
            <h2 className="exercise-heading"> 🏋️ Add Exercise </h2>
            <form onSubmit={handleAddExercise} className="exercise-form">
                <input className="exercise-input" name="name" placeholder="Exercise Name" value={exercise.name} onChange={handleChange} />
                <input className="exercise-input" type="number" name="sets" placeholder="Sets" value={exercise.sets} onChange={handleChange} />
                <input className="exercise-input" type="number" name="reps" placeholder="Reps" value={exercise.reps} onChange={handleChange} />
                <input className="exercise-input" type="number" name="weight" placeholder="Weight (lb)" value={exercise.weight} onChange={handleChange} />
                <button type="submit" className="exercise-add-button"> Add </button>
            </form>

            <div className="exercise-log-container">
                <h3 className="logged-heading"> 📝 Logged Exercises </h3>
                <div className="exercise-log">
                    {exerciseList.length === 0 && <p className="no-data-text"> No exercises logged yet. </p>}
                    {exerciseList.map((ex, index) => (
                        <div key={index} className="exercise-card">
                            <div className="exercise-name"> {ex.name} </div>
                            <div className="exercise-details-row"> 
                                <div className="exercise-details"> {ex.sets} sets x {ex.reps} reps {ex.weight && `@ ${ex.weight} lb`} </div>
                                <div className="exercise-date"> {ex.date} </div>
                            <button onClick={() => handleDelete(index)} className="exercise-delete-button"> ✖ </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
    </div>)
}

export default ExerciseForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './setup.css';

const Setup = () => {
  const [formData, setFormData] = useState({
    height: '',
    currentWeight: '',
    goalWeight: '',
    activityLevel: ''
  });

  const navigate = useNavigate(); // for programmatic navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Setup Data Submitted:', formData);
    // Optional: Add Supabase save logic here
    navigate('/'); // Redirect to the root page
  };

  return (
    <div className="setupBox">
      <img src="logo.png" className="logoImg" alt="Logo" />
      <form onSubmit={handleSubmit}>
        <p className="setupHeading">Fill this shit out, Bro</p>

        <div className="setupForm">
          <h2>Height (in):</h2>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />

          <h2>Current Weight (lb):</h2>
          <input
            type="number"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={handleChange}
            required
          />

          <h2>Goal Weight (lb):</h2>
          <input
            type="number"
            name="goalWeight"
            value={formData.goalWeight}
            onChange={handleChange}
            required
          />

          <h2>Activity Level:</h2>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Activity Level --</option>
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Lightly active (1–3 days/week)</option>
            <option value="moderate">Moderately active (3–5 days/week)</option>
            <option value="active">Very active (6–7 days/week)</option>
          </select>

          <div className="continueDiv">
            <button className="continueButton" type="submit">
              Finish Setup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Setup;


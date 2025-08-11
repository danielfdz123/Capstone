import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import './Setup.css';

const SetUp = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [accountInfo, setAccountInfo] = useState({
    height: '',
    currentWeight: '',
    weightGoal: '',
    activity_lvl: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id && storedUser.username) {
      setUser(storedUser);
    } else {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from('Stats').insert([
      {
        username: user.username,
        first_name: user.first_name,
        height: parseFloat(accountInfo.height),
        currentWeight: parseFloat(accountInfo.currentWeight),
        weightGoal: parseFloat(accountInfo.weightGoal),
        activity_lvl: accountInfo.activity_lvl,
      }
    ]);
    if (error) 
    {
      setError('Failed to save to Logs. Try again.');
    } 
    else 
    {
      navigate('/home');
    }
  };

  return (
    <div className="setupBox">
      <img src="logo.png" className="logoImg" alt="Logo" />
      <form onSubmit={handleSubmit}>
        <p className="setupHeading">Fill this out, Bro</p>

        <div className="setupForm">
          <h2>Height (in):</h2>
          <input
            type="number"
            name="height"
            value={accountInfo.height}
            onChange={handleChange}
            required
          />

          <h2>Current Weight (lb):</h2>
          <input
            type="number"
            name="currentWeight"
            value={accountInfo.currentWeight}
            onChange={handleChange}
            required
          />

          <h2>Goal Weight (lb):</h2>
          <input
            type="number"
            name="weightGoal"
            value={accountInfo.weightGoal}
            onChange={handleChange}
            required
          />

          <h2>Activity Level:</h2>
          <select
            name="activity_lvl"
            value={accountInfo.activity_lvl}
            onChange={handleChange}
            required
          >
            <option value = ""> -- Select Activity Level -- </option>
            <option value = "Sedentary"> Sedentary (little to no exercise) </option>
            <option value = "Lightly active"> Lightly active (1–3 days/week) </option>
            <option value = "Moderately active"> Moderately active (3–5 days/week) </option>
            <option value = "Very active"> Very active (6–7 days/week) </option>
          </select>

          <div className="continueDiv">
            <button className="continueButton" type="submit">Finish Setup</button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default SetUp;
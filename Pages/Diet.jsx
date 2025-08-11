import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

import './Diet.css';
import Navbar from '../Components/Navbar';
import FoodLog from '../Components/FoodLog';

const Diet = () => {
  	const [selectedDate, setSelectedDate] = useState('');
  	const [username, setUsername] = useState('');
  	const [showModal, setShowModal] = useState(false);

  	const [calorieCount, setCalorieCount] = useState(0);
  	const [foodCount, setFoodCount] = useState(0);

  	useEffect(() => {
    	const storedUser = localStorage.getItem('user');
   	 	const parsedUser = storedUser ? JSON.parse(storedUser) : {};
    	const username_ = parsedUser.username || '';
    	setUsername(username_);

    	const modalFlagKey = `dietModalShown_${username_}`;
    	const modalShown = localStorage.getItem(modalFlagKey);
    	if (!modalShown && username_) 
		{
      		setShowModal(true);
      		localStorage.setItem(modalFlagKey, 'true');
    	}

    	const today = new Date();
    	const date = today.toLocaleDateString('en-US', {
      		weekday: 'long',
      		year: 'numeric',
      		month: 'long',
      		day: 'numeric',
      		timeZone: 'America/New_York'
    	});
    	setSelectedDate(date);
  	}, []);

  	const handleDietLogged = (payload) => {
    if (typeof payload === 'number') {
      setFoodCount(payload);
      return;
    }
    if (payload && typeof payload === 'object') {
      if (typeof payload.count === 'number') setFoodCount(payload.count);
      if (typeof payload.calories === 'number') setCalorieCount(payload.calories);
    }
  };

  return (
    <>
      {/* WELCOME MESSAGE - Only shows once per new account */}
      {showModal && (
        <div className="welcomeDiv">
          <div className="welcomeMsg">
            <h1> 🍽️ Welcome to the Diet Page! 🍽️ </h1>
            <p> Here is where you can log your daily food intake! </p>
            <p> Simply follow the form below and start logging. </p>
            <p>
              But be sure to save your food intake as you go by hitting the <b><u> Save</u></b> button!
            </p>
            <button onClick={() => setShowModal(false)}> Understood! </button>
          </div>
        </div>
      )}

      <div className = "dietBox">
        {/* IMPORT NAVBAR COMPONENT */}
        <div className="navDiv">
          <Navbar />
        </div>

        {/* CONTENT TEXT */}
        <div className="dietContent">
          <h3 className="intro">
            Today is {selectedDate}, and you have {foodCount} {foodCount !== 1 ? 'meals' : 'meal'} logged,
            with a total of {calorieCount} {calorieCount !== 1 ? 'calories' : 'calorie'}!
          </h3>
          <p> Use the chart below to start logging your food intake! </p>

          {/* Pass the username and the correct callback */}
          <FoodLog username={username} onFoodLogged={handleDietLogged} />
        </div>
      </div>
    </>
  );
};

export default Diet;
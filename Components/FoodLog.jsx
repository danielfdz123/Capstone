import React, { useState, useEffect } from 'react';
import './FoodLog.css';

const FoodLog = () => {
  const [foodLog, setFoodLog] = useState({
    breakfast: [],
    lunch: [],
    dinner: []
  });

  const [totalCalories, setTotalCalories] = useState(0);
  const [showGif, setShowGif] = useState(false);

  const foodOptions = {
    breakfast: [
      { name: 'Egg (1)', calories: 70 },
      { name: 'White Bread (1 slice)', calories: 80 },
      { name: 'American Cheese (1 slice)', calories: 60 },
      { name: 'Tsp Vegetable Oil', calories: 40 },
      { name: 'Oatmeal', calories: 150 },
      { name: 'Fruit Smoothie', calories: 180 },
    ],
    lunch: [
      { name: 'Chicken Breast (100g)', calories: 165 },
      { name: 'White Bread (1 slice)', calories: 80 },
      { name: 'American Cheese (1 slice)', calories: 60 },
      { name: 'Soda Can', calories: 140 },
      { name: 'Grilled Chicken Sandwich', calories: 400 },
      { name: 'Caesar Salad', calories: 300 },
    ],
    dinner: [
      { name: 'Chicken Breast (100g)', calories: 165 },
      { name: 'Steak (150g)', calories: 350 },
      { name: 'Pasta Alfredo', calories: 550 },
      { name: 'Tofu Stir Fry', calories: 400 },
      { name: 'Soda Can', calories: 140 },
    ]
  };

  const handleAddFood = (meal, food) => {
    const updatedMeal = [...foodLog[meal], food];
    const updatedFoodLog = { ...foodLog, [meal]: updatedMeal };

    setFoodLog(updatedFoodLog);
    setTotalCalories(prev => prev + food.calories);
  };

  const handleDeleteFood = (meal, index) => {
    const removedFood = foodLog[meal][index];
    const updatedMeal = foodLog[meal].filter((_, i) => i !== index);
    const updatedFoodLog = { ...foodLog, [meal]: updatedMeal };

    setFoodLog(updatedFoodLog);
    setTotalCalories(prev => prev - removedFood.calories);
  };

  useEffect(() => {
    const playDuration = 5000;
    const intervalDuration = 60000;

    const playGif = () => {
      setShowGif(true);
      setTimeout(() => setShowGif(false), playDuration);
    };

    playGif();
    const interval = setInterval(playGif, intervalDuration);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="foodlog-container">
      <h2 className="foodlog-heading">🍽️ Daily Food Log</h2>
      <div className="total-calories">Total Calories: {totalCalories} kcal</div>

      {['breakfast', 'lunch', 'dinner'].map((meal) => (
        <div key={meal} className="meal-section">
          <div className="meal-title">
            {meal.charAt(0).toUpperCase() + meal.slice(1)}
          </div>

          <div className="food-form">
            <select
              className="food-input"
              onChange={(e) => {
                const selected = foodOptions[meal].find(f => f.name === e.target.value);
                if (selected) handleAddFood(meal, selected);
              }}
              defaultValue=""
            >
              <option value="" disabled>Select Food</option>
              {foodOptions[meal].map((food, idx) => (
                <option key={idx} value={food.name}>
                  {food.name} ({food.calories} kcal)
                </option>
              ))}
            </select>
          </div>

          <div className="food-list">
            {foodLog[meal].length === 0 ? (
              <p style={{ color: 'white' }}>No foods logged yet.</p>
            ) : (
              foodLog[meal].map((item, idx) => (
                <div key={idx} className="food-item">
                  <span className="food-details">
                    {item.name} - {item.calories} kcal
                  </span>
                  <button
                    onClick={() => handleDeleteFood(meal, idx)}
                    className="food-delete-button"
                    aria-label="Delete food item"
                  >
                    ✖
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ))}

      {showGif && (
        <div className="gif-overlay">
          <img src="/foxy.gif" alt="Fun GIF" className="gif-img" />
        </div>
      )}
    </div>
  );
};

export default FoodLog;

import React, { useState } from 'react';
import './FoodLog.css';

const FoodLog = () => {
  const [foodLog, setFoodLog] = useState({
    breakfast: [],
    lunch: [],
    dinner: []
  });

  const [totalCalories, setTotalCalories] = useState(0);

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
    setTotalCalories(totalCalories + food.calories);
  };

  const handleDeleteFood = (meal, index) => {
    const removedFood = foodLog[meal][index];
    const updatedMeal = foodLog[meal].filter((_, i) => i !== index);
    const updatedFoodLog = { ...foodLog, [meal]: updatedMeal };

    setFoodLog(updatedFoodLog);
    setTotalCalories(totalCalories - removedFood.calories);
  };

  return (
    <div className="exercise-container">
      <h2 className="exercise-heading"> 🍽️ Daily Food Log </h2>
      <div className="exercise-card" style={{ textAlign: 'center', fontSize: '18px' }}>
        Total Calories: {totalCalories} kcal
      </div>

      {['breakfast', 'lunch', 'dinner'].map(meal => (
        <div key={meal} className="exercise-log">
          <h3 className="logged-heading"> {meal.charAt(0).toUpperCase() + meal.slice(1)} </h3>

          <select
            className="exercise-input"
            onChange={(e) => {
              const selected = foodOptions[meal].find(f => f.name === e.target.value);
              if (selected) handleAddFood(meal, selected);
            }}
            defaultValue=""
          >
            <option value="" disabled> Select Food </option>
            {foodOptions[meal].map((food, idx) => (
              <option key={idx} value={food.name}>{food.name} ({food.calories} kcal)</option>
            ))}
          </select>

          {foodLog[meal].length === 0 ? (
            <p className="no-data-text"> No foods logged yet. </p>
          ) : (
            foodLog[meal].map((item, idx) => (
              <div key={idx} className="exercise-card">
                <div className="exercise-details-row">
                  <div className="exercise-details"> {item.name} - {item.calories} kcal </div>
                  <button onClick={() => handleDeleteFood(meal, idx)} className="exercise-delete-button"> ✖ </button>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default FoodLog;

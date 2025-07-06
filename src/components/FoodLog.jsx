import React, { useState } from 'react';
import './FoodLog.css';

const FoodLog = () => {
  const initialMeals = {
    breakfast: [],
    lunch: [],
    dinner: []
  };

  const [meals, setMeals] = useState(initialMeals);
  const [foodInput, setFoodInput] = useState({
    breakfast: { name: '', calories: '' },
    lunch: { name: '', calories: '' },
    dinner: { name: '', calories: '' }
  });

  const handleInputChange = (meal, e) => {
    const { name, value } = e.target;
    setFoodInput((prev) => ({
      ...prev,
      [meal]: { ...prev[meal], [name]: value }
    }));
  };

  const handleAddFood = (meal, e) => {
    e.preventDefault();
    const { name, calories } = foodInput[meal];
    if (!name.trim() || !calories || isNaN(calories) || Number(calories) <= 0) {
      alert('Please enter a valid food name and positive calorie count');
      return;
    }
    const newFood = {
      name: name.trim(),
      calories: Number(calories)
    };
    setMeals((prev) => ({
      ...prev,
      [meal]: [...prev[meal], newFood]
    }));
    setFoodInput((prev) => ({
      ...prev,
      [meal]: { name: '', calories: '' }
    }));
  };

  const handleDeleteFood = (meal, index) => {
    setMeals((prev) => {
      const updatedMeal = [...prev[meal]];
      updatedMeal.splice(index, 1);
      return { ...prev, [meal]: updatedMeal };
    });
  };

  const totalCalories = Object.values(meals).flat().reduce((sum, food) => sum + food.calories, 0);

  return (
    <div className="foodlog-container">
      <h2 className="foodlog-heading">🍽️ Food Log</h2>
      <div className="total-calories">Total Calories: {totalCalories}</div>

      {['breakfast', 'lunch', 'dinner'].map((meal) => (
        <div key={meal} className="meal-section">
          <h3 className="meal-title">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
          <form className="food-form" onSubmit={(e) => handleAddFood(meal, e)}>
            <input
              className="food-input"
              type="text"
              name="name"
              placeholder="Food Name"
              value={foodInput[meal].name}
              onChange={(e) => handleInputChange(meal, e)}
            />
            <input
              className="food-input"
              type="number"
              name="calories"
              placeholder="Calories"
              value={foodInput[meal].calories}
              onChange={(e) => handleInputChange(meal, e)}
            />
            <button type="submit" className="food-add-button">Add</button>
          </form>

          <div className="food-list">
            {meals[meal].length === 0 && <p style={{color: '#bbb', fontStyle: 'italic'}}>No foods added yet.</p>}
            {meals[meal].map((food, idx) => (
              <div key={idx} className="food-item">
                <div className="food-details">{food.name} — {food.calories} cal</div>
                <button className="food-delete-button" onClick={() => handleDeleteFood(meal, idx)}>✖</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodLog;

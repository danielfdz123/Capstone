import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import './FoodLog.css';

const FoodLog = () => {
  const [foodLog, setFoodLog] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  const [totalCalories, setTotalCalories] = useState(0);
  const [username] = useState('');

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const fullFoodList = [
    { name: 'Apple', calories: 95, serving: '1 medium' },
    { name: 'Banana', calories: 105, serving: '1 medium' },
    { name: 'Orange', calories: 62, serving: '1 medium' },
    { name: 'Grapes', calories: 62, serving: '1 cup' },
    { name: 'Strawberries', calories: 49, serving: '1 cup' },
    { name: 'Blueberries', calories: 84, serving: '1 cup' },
    { name: 'Avocado', calories: 234, serving: '1 whole' },
    { name: 'Pear', calories: 102, serving: '1 medium' },
    { name: 'Peach', calories: 59, serving: '1 medium' },
    { name: 'Pineapple', calories: 82, serving: '1 cup chunks' },
    { name: 'Broccoli', calories: 55, serving: '1 cup' },
    { name: 'Spinach', calories: 7, serving: '1 cup' },
    { name: 'Carrots', calories: 52, serving: '1 cup' },
    { name: 'Bell Pepper', calories: 31, serving: '1 cup' },
    { name: 'Tomato', calories: 32, serving: '1 medium' },
    { name: 'Cucumber', calories: 16, serving: '1 cup sliced' },
    { name: 'Lettuce', calories: 10, serving: '2 cups' },
    { name: 'Cauliflower', calories: 25, serving: '1 cup' },
    { name: 'Zucchini', calories: 20, serving: '1 cup sliced' },
    { name: 'Sweet Potato', calories: 112, serving: '1 medium' },
    { name: 'Chicken Breast', calories: 165, serving: '3.5 oz' },
    { name: 'Salmon Fillet', calories: 206, serving: '3.5 oz' },
    { name: 'Ground Turkey', calories: 125, serving: '3.5 oz' },
    { name: 'Eggs', calories: 70, serving: '1 large' },
    { name: 'Greek Yogurt', calories: 130, serving: '1 cup' },
    { name: 'Tuna', calories: 154, serving: '3.5 oz' },
    { name: 'Lean Beef', calories: 250, serving: '3.5 oz' },
    { name: 'Tofu', calories: 94, serving: '3.5 oz' },
    { name: 'Cottage Cheese', calories: 98, serving: '1/2 cup' },
    { name: 'Shrimp', calories: 99, serving: '3.5 oz' },
    { name: 'Brown Rice', calories: 112, serving: '1/2 cup cooked' },
    { name: 'Quinoa', calories: 111, serving: '1/2 cup cooked' },
    { name: 'Oatmeal', calories: 150, serving: '1 cup cooked' },
    { name: 'Whole Wheat Bread', calories: 80, serving: '1 slice' },
    { name: 'Pasta', calories: 220, serving: '1 cup cooked' },
    { name: 'White Rice', calories: 130, serving: '1/2 cup cooked' },
    { name: 'Bagel', calories: 245, serving: '1 small' },
    { name: 'Almonds', calories: 160, serving: '1 oz (23 nuts)' },
    { name: 'Walnuts', calories: 185, serving: '1 oz' },
    { name: 'Peanut Butter', calories: 190, serving: '2 tbsp' },
    { name: 'Chia Seeds', calories: 140, serving: '1 oz' },
    { name: 'Cashews', calories: 157, serving: '1 oz' },
    { name: 'Sunflower Seeds', calories: 165, serving: '1 oz' },
    { name: 'Milk (2%)', calories: 122, serving: '1 cup' },
    { name: 'Cheddar Cheese', calories: 113, serving: '1 oz' },
    { name: 'Mozzarella', calories: 85, serving: '1 oz' },
    { name: 'Yogurt', calories: 150, serving: '1 cup' },
    { name: 'Green Tea', calories: 2, serving: '1 cup' },
    { name: 'Coffee (black)', calories: 2, serving: '1 cup' },
    { name: 'Orange Juice', calories: 112, serving: '1 cup' },
    { name: 'Protein Shake', calories: 120, serving: '1 scoop' },
    { name: 'Dark Chocolate', calories: 170, serving: '1 oz' },
    { name: 'Granola Bar', calories: 120, serving: '1 bar' },
    { name: 'Rice Cakes', calories: 35, serving: '1 cake' },
    { name: 'Hummus', calories: 25, serving: '1 tbsp' },
    { name: 'Crackers', calories: 16, serving: '1 cracker' },
  ];

  const distributeFoods = (foods) => {
    const perMeal = Math.ceil(foods.length / 3);
    return {
      breakfast: foods.slice(0, perMeal),
      lunch: foods.slice(perMeal, perMeal * 2),
      dinner: foods.slice(perMeal * 2),
    };
  };

  const foodOptions = distributeFoods(fullFoodList);

  const handleAddFood = async (meal, food) => {
    const updatedMeal = [...foodLog[meal], food];
    const updatedFoodLog = { ...foodLog, [meal]: updatedMeal };
    setFoodLog(updatedFoodLog);
    setTotalCalories(prev => prev + food.calories);

    // ✅ INSERT into Supabase
    const { error } = await supabase.from('Diet').insert({
      username,
      date: new Date().toISOString(), // full timestamp
      food: food.name,
      foodCount: 1,
      calories: food.calories,
    });

    if (error) {
      console.error('Error inserting into Supabase:', error);
    }
  };

  const handleDeleteFood = async (meal, index) => {
    const removedFood = foodLog[meal][index];
    const updatedMeal = foodLog[meal].filter((_, i) => i !== index);
    const updatedFoodLog = { ...foodLog, [meal]: updatedMeal };
    setFoodLog(updatedFoodLog);
    setTotalCalories(prev => prev - removedFood.calories);

    // ✅ DELETE from Supabase — you can improve this with unique IDs
    const { error } = await supabase
      .from('Diet')
      .delete()
      .match({
        username,
        food: removedFood.name,
        calories: removedFood.calories,
        date: removedFood.date || today, // attempt to match on date
      });

    if (error) {
      console.error('Error deleting from Supabase:', error);
    }
  };

  const fetchFoodLog = async () => {
    const { data, error } = await supabase
      .from('Diet')
      .select('*')
      .eq('username', username)
      .gte('date', `${today}T00:00:00`)
      .lte('date', `${today}T23:59:59`);

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return;
    }

    const meals = {
      breakfast: [],
      lunch: [],
      dinner: [],
    };

    let calorieSum = 0;

    data.forEach(entry => {
      const food = fullFoodList.find(f => f.name === entry.food);
      if (food) {
        const mealType = guessMealTime(new Date(entry.date).getHours());
        meals[mealType].push(food);
        calorieSum += food.calories;
      }
    });

    setFoodLog(meals);
    setTotalCalories(calorieSum);
  };

  const guessMealTime = (hour) => {
    if (hour < 11) return 'breakfast';
    if (hour < 16) return 'lunch';
    return 'dinner';
  };

  useEffect(() => {
    fetchFoodLog();
  }, []);

  return (
    <div className="exercise-container">
      <h2 className="exercise-heading"> 🍽️ Daily Food Log </h2>
      <div className="exercise-card" style={{ textAlign: 'center', fontSize: '18px' }}>
        Total Calories: {totalCalories} kcal
      </div>

      {['breakfast', 'lunch', 'dinner'].map(meal => (
        <div key={meal} className="exercise-log">
          <h3 className="logged-heading">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
          <select
            className="exercise-input"
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

          {foodLog[meal].length === 0 ? (
            <p className="no-data-text">No foods logged yet.</p>
          ) : (
            foodLog[meal].map((item, idx) => (
              <div key={idx} className="exercise-card">
                <div className="exercise-details-row">
                  <div className="exercise-details">{item.name} - {item.calories} kcal</div>
                  <button onClick={() => handleDeleteFood(meal, idx)} className="exercise-delete-button">✖</button>
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

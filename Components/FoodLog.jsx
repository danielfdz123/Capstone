import React, { useState, useEffect } from 'react';
import { supabase } from '../client'; 
import './FoodLog.css';

const FoodLog = () => {
  const [username, setUsername] = useState(null);
  const [foodLog, setFoodLog] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [totalCalories, setTotalCalories] = useState(0);

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'

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

  // Split fullFoodList into 3 parts for breakfast, lunch, dinner dropdowns
  const distributeFoods = (foods) => {
    const perMeal = Math.ceil(foods.length / 3);
    return {
      breakfast: foods.slice(0, perMeal),
      lunch: foods.slice(perMeal, perMeal * 2),
      dinner: foods.slice(perMeal * 2),
    };
  };

  const foodOptions = distributeFoods(fullFoodList);

  // Guess meal type by hour of day
  const guessMealTime = (hour) => {
    if (hour < 11) return 'breakfast';
    if (hour < 16) return 'lunch';
    return 'dinner';
  };

  // Fetch username once on mount
  useEffect(() => {
    const fetchUsername = async () => {
      const { data, error } = await supabase
        .from('Accounts')
        .select('username')
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching username:', error);
        return;
      }

      setUsername(data.username);
    };

    fetchUsername();
  }, []);

  // Fetch food log once username is set
  useEffect(() => {
    if (!username) return;

    const fetchFoodLog = async () => {
      const startOfDay = `${formattedDate}T00:00:00Z`;
      const endOfDay = `${formattedDate}T23:59:59Z`;

      const { data, error } = await supabase
        .from('Diet')
        .select('*')
        .eq('username', username)
        .gte('date', startOfDay)
        .lte('date', endOfDay);

      if (error) {
        console.error('Error fetching food log:', error);
        return;
      }

      const meals = { breakfast: [], lunch: [], dinner: [] };
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

    fetchFoodLog();
  }, [username, formattedDate]);

  // Add food handler
  const handleAddFood = async (meal, food) => {
    if (!username) {
      console.warn('No username available yet.');
      return;
    }

    // Update state locally
    const updatedMeal = [...foodLog[meal], food];
    const updatedFoodLog = { ...foodLog, [meal]: updatedMeal };
    setFoodLog(updatedFoodLog);
    setTotalCalories(prev => prev + food.calories);

    // Insert into Supabase
    const { error } = await supabase.from('Diet').insert({
      username,
      date: new Date().toISOString(),
      food: food.name,
      foodCount: 1,
      calories: food.calories,
    });

    if (error) {
      console.error('Error inserting into Supabase:', error);
    }
  };

  // Delete food handler
  const handleDeleteFood = async (meal, index) => {
    const removedFood = foodLog[meal][index];
    if (!removedFood) return;

    // Update state locally
    const updatedMeal = foodLog[meal].filter((_, i) => i !== index);
    const updatedFoodLog = { ...foodLog, [meal]: updatedMeal };
    setFoodLog(updatedFoodLog);
    setTotalCalories(prev => prev - removedFood.calories);

    // Delete from Supabase - find the matching row to delete by username, food, and date range
    const startOfDay = `${formattedDate}T00:00:00Z`;
    const endOfDay = `${formattedDate}T23:59:59Z`;

    // Find the record id to delete
    const { data, error } = await supabase
      .from('Diet')
      .select('id')
      .eq('username', username)
      .eq('food', removedFood.name)
      .gte('date', startOfDay)
      .lte('date', endOfDay)
      .limit(1);

    if (error) {
      console.error('Error finding record to delete:', error);
      return;
    }
    if (!data || data.length === 0) return;

    const recordId = data[0].id;

    const { error: deleteError } = await supabase
      .from('Diet')
      .delete()
      .eq('id', recordId);

    if (deleteError) {
      console.error('Error deleting record:', deleteError);
    }
  };

  if (!username) return <div>Loading username...</div>;

  return (
    <div className="foodlog-container">
      <h1 style={{ color: 'white' }}>Food Log for {username}</h1>
      <h2 style={{ color: 'white' }}>Total Calories: {totalCalories}</h2>

      {['breakfast', 'lunch', 'dinner'].map((meal) => (
        <div key={meal} className="meal-section" style={{ color: 'white' }}>
          <h3 style={{ color: 'white' }}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h3>
          <select
            style={{ color: 'black' }}  // keep text black inside select for readability
            onChange={(e) => {
              const foodName = e.target.value;
              if (foodName === '') return;
              const selectedFood = foodOptions[meal].find(f => f.name === foodName);
              if (selectedFood) {
                handleAddFood(meal, selectedFood);
              }
              e.target.value = ''; // Reset select after choosing
            }}
        >
            <option value="">-- Select Food --</option>
            {foodOptions[meal].map(food => (
              <option key={food.name} value={food.name}>
                {food.name} ({food.calories} cal)
              </option>
            ))}
          </select>

          <ul>
            {foodLog[meal].map((food, i) => (
              <li key={`${meal}-${i}`} style={{ color: 'white' }}>
                {food.name} - {food.calories} cal{' '}
                <button onClick={() => handleDeleteFood(meal, i)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FoodLog;

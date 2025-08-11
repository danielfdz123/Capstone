// src/Components/FoodLog.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../src/client';
import './FoodLog.css';

const FoodLog = ({ username, onFoodLogged }) => {
  const [mealType, setMealType] = useState('');                 
  const [foodEntry, setFoodEntry] = useState({ name: '', quantity: 1 });
  const [dietList, setDietList] = useState([]);    
  
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const endTime = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];


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
      Breakfast: foods.slice(0, perMeal),
      Lunch: foods.slice(perMeal, perMeal * 2),
      Dinner: foods.slice(perMeal * 2),
    };
  };

  const foodOptions = distributeFoods(fullFoodList);
  const get24HourRange = () => 
  {
    return {formattedDate, endTime};
  };

  // Fetch diet info from todays 24hr time period
  const fetchTodayDiet = useCallback(async () => {
    if (!username) return;
    const { formattedDate, endTime } = get24HourRange();

    const { data, error } = await supabase
      .from('Diet')
      .select('id, date, food, foodCount, calories')
      .eq('username', username)
      .gte('date', formattedDate)
      .lt('date', endTime);
    const rows = data || [];
    setDietList(rows);

    const count = rows.reduce((sum, r) => sum + (Number(r.foodCount) || 0), 0);
    const calories = rows.reduce((acc, r) => acc + (Number(r.calories) || 0), 0);
    if (typeof onFoodLogged === 'function') 
    {
      onFoodLogged({ count, calories });
    }
  }, [username, onFoodLogged]);

  useEffect(() => {
    fetchTodayDiet();
  }, [fetchTodayDiet]);

  const handleQuantityChange = (e) => {
    const amount = Math.max(1, Number(e.target.value) || 1);
    setFoodEntry((prev) => ({ ...prev, quantity: amount }));
  };

  const saveMeal = async (e) => {
    e.preventDefault();
    if (!mealType.trim()) return alert('Please select a meal type.');
    if (!foodEntry.name) return alert('Please select a food item.');

    const base = fullFoodList.find((f) => f.name === foodEntry.name)?.calories || 0;
    const amount = foodEntry.quantity || 1;
    const totalCalories = base * amount;

    const row = {
      username,
      date: new Date().toISOString(),
      food: foodEntry.name,
      foodCount: amount,
      calories: totalCalories,
    };
    await supabase.from('Diet').insert([row]);
    await fetchTodayDiet();
  };

  const currentOptions =
    mealType && foodOptions[mealType] ? foodOptions[mealType] : [];

  const previewCalories = (() => {
    if (!foodEntry.name) return '';
    const base = fullFoodList.find((f) => f.name === foodEntry.name)?.calories || 0;
    return `${base * (foodEntry.quantity || 1)} cal`;
  })();

  return (
    <div className = "main-layout">
      <div className = "dietDiv">
        <h2 className = "dietHeading"> 🍽️ Add Food</h2>

        <h4 className = "meal">
          Current Meal:
          <select
            className = "mealInput"
            value = {mealType}
            onChange = {(e) => setMealType(e.target.value)}
          >
            <option value = ""> Select Meal </option>
            <option value = "Breakfast"> Breakfast </option>
            <option value = "Lunch"> Lunch </option>
            <option value = "Dinner"> Dinner </option>
          </select>
        </h4>

        <form className = "mealForm">
          <select
            className = "mealSelect"
            value={foodEntry.name}
            onChange={(e) => setFoodEntry({ ...foodEntry, name: e.target.value })}
            disabled={!mealType}
          >
            <option value="">{mealType ? `Select ${mealType} Item` : 'Select Meal first'}</option>
            {currentOptions.map((food) => (
              <option key={food.name} value={food.name}>
                {food.name} ({food.calories} cal)
              </option>
            ))}
          </select>

          <input
            className="foodInput"
            type="number"
            min="1"
            value={foodEntry.quantity}
            onChange={handleQuantityChange}
            disabled={!mealType}
          />

          <input
            className="foodInput"
            type="text"
            value={previewCalories}
            placeholder="Calories"
            readOnly
          />

          <button className = "nextSet" type="button" onClick={saveMeal}>
            Log Meal
          </button>
        </form>

        {/* HISTOTY CONTENT  */}
        {dietList.map((row) => (
          <div className = "dietHistory" key={row.id}>
            <div className = "foodName"> {row.food} </div>
            <div className = "foodQuantity"> x{row.foodCount} </div>
            <div className = "foodName"> {row.calories} calories</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodLog;
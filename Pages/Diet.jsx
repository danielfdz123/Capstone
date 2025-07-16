import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

import './Diet.css';
import Navbar from '../Components/Navbar';

// Food list
const FOOD_ITEMS = [
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

const Diet = () => {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [serving, setServing] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  // Update total calories whenever foodList changes
  useEffect(() => {
    const total = foodList.reduce((sum, item) => sum + Number(item.calories), 0);
    setTotalCalories(total);
  }, [foodList]);

  const addFood = (e) => {
    e.preventDefault();
    if (!mealName || !calories || isNaN(calories)) return;

    const newFood = {
      id: Date.now(),
      name: mealName,
      calories: Number(calories),
      serving: serving || 'N/A',
    };

    setFoodList((prev) => [newFood, ...prev]);
    setMealName('');
    setCalories('');
    setServing('');
  };

  const deleteFood = (id) => {
    setFoodList((prev) => prev.filter((food) => food.id !== id));
  };

  return (
    <div className="dietBox" style={{ maxWidth: 500, margin: 'auto', padding: '1rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#3a3a3a', borderRadius: '10px', color: 'white' }}>
      <div className="navDiv" style={{ marginBottom: '1rem' }}>
        <Navbar />
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Food Log</h2>
      <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem', color: '#ffd700' }}>
        Total Calories: {totalCalories}
      </div>

      <form onSubmit={addFood} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Food name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          style={{ padding: '8px 10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
          list="foodSuggestions"
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          style={{ padding: '8px 10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Serving (optional)"
          value={serving}
          onChange={(e) => setServing(e.target.value)}
          style={{ padding: '8px 10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
          list="foodSuggestions"
        />
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '10px' }}>
          Add
        </button>
      </form>

      <datalist id="foodSuggestions">
        {FOOD_ITEMS.map((food, idx) => (
          <option key={idx} value={food.name} />
        ))}
      </datalist>

      <div style={{ maxHeight: 150, overflowY: 'auto', paddingRight: 6 }}>
        {foodList.map((food) => (
          <div
            key={food.id}
            style={{
              backgroundColor: '#f9f9f9',
              borderRadius: 6,
              border: '1px solid #ddd',
              padding: '8px 12px',
              marginBottom: 6,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#333',
            }}
          >
            <div>
              <strong>{food.name}</strong> - {food.calories} cal - {food.serving}
            </div>
            <button
              onClick={() => deleteFood(food.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#d11a2a',
                fontSize: 18,
                cursor: 'pointer',
                marginLeft: 10,
              }}
              aria-label={`Delete ${food.name}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diet;

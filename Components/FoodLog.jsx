/*
import React, { useState } from 'react';

const foodOptions = [
  // Fruits
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

  // Vegetables
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

  // Proteins
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

  // Grains & Carbs
  { name: 'Brown Rice', calories: 112, serving: '1/2 cup cooked' },
  { name: 'Quinoa', calories: 111, serving: '1/2 cup cooked' },
  { name: 'Oatmeal', calories: 150, serving: '1 cup cooked' },
  { name: 'Whole Wheat Bread', calories: 80, serving: '1 slice' },
  { name: 'Pasta', calories: 220, serving: '1 cup cooked' },
  { name: 'White Rice', calories: 130, serving: '1/2 cup cooked' },
  { name: 'Bagel', calories: 245, serving: '1 small' },

  // Nuts & Seeds
  { name: 'Almonds', calories: 160, serving: '1 oz (23 nuts)' },
  { name: 'Walnuts', calories: 185, serving: '1 oz' },
  { name: 'Peanut Butter', calories: 190, serving: '2 tbsp' },
  { name: 'Chia Seeds', calories: 140, serving: '1 oz' },
  { name: 'Cashews', calories: 157, serving: '1 oz' },
  { name: 'Sunflower Seeds', calories: 165, serving: '1 oz' },

  // Dairy
  { name: 'Milk (2%)', calories: 122, serving: '1 cup' },
  { name: 'Cheddar Cheese', calories: 113, serving: '1 oz' },
  { name: 'Mozzarella', calories: 85, serving: '1 oz' },
  { name: 'Yogurt', calories: 150, serving: '1 cup' },

  // Beverages
  { name: 'Green Tea', calories: 2, serving: '1 cup' },
  { name: 'Coffee (black)', calories: 2, serving: '1 cup' },
  { name: 'Orange Juice', calories: 112, serving: '1 cup' },
  { name: 'Protein Shake', calories: 120, serving: '1 scoop' },

  // Snacks
  { name: 'Dark Chocolate', calories: 170, serving: '1 oz' },
  { name: 'Granola Bar', calories: 120, serving: '1 bar' },
  { name: 'Rice Cakes', calories: 35, serving: '1 cake' },
  { name: 'Hummus', calories: 25, serving: '1 tbsp' },
  { name: 'Crackers', calories: 16, serving: '1 cracker' },
];

const FoodLog = () => {
  const [foodList, setFoodList] = useState([]);
  const [selectedFoodName, setSelectedFoodName] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [calories, setCalories] = useState('');

  const addFoodItem = () => {
    if (!selectedFoodName) return;

    const foodItem = foodOptions.find(food => food.name === selectedFoodName);
    if (!foodItem) return;

    // Use input serving if provided, else default from foodOptions
    const serving = servingSize || foodItem.serving;
    // Calculate calories based on serving if desired; here we just use default calories
    const calorieValue = calories ? Number(calories) : foodItem.calories;

    setFoodList(prev => [
      ...prev,
      {
        name: foodItem.name,
        calories: calorieValue,
        serving,
      },
    ]);

    // Clear inputs
    setSelectedFoodName('');
    setServingSize('');
    setCalories('');
  };

  const deleteFoodItem = index => {
    setFoodList(prev => prev.filter((_, i) => i !== index));
  };

  const totalCalories = foodList.reduce((sum, food) => sum + food.calories, 0);

  return (
    <div className="foodlog-container">
      <h2 className="foodlog-heading">Food Log</h2>
      <div className="total-calories">Total Calories: {totalCalories}</div>

      <div className="food-form">
        <select
          className="food-input"
          value={selectedFoodName}
          onChange={e => setSelectedFoodName(e.target.value)}
        >
          <option value="">Select Food</option>
          {foodOptions.map(food => (
            <option key={food.name} value={food.name}>
              {food.name} ({food.calories} cal / {food.serving})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Serving size (optional)"
          className="food-input"
          value={servingSize}
          onChange={e => setServingSize(e.target.value)}
        />

        <input
          type="number"
          placeholder="Calories (optional)"
          className="food-input"
          value={calories}
          onChange={e => setCalories(e.target.value)}
          min="0"
        />

        <button className="food-add-button" onClick={addFoodItem}>
          Add
        </button>
      </div>

      <div className="food-list">
        {foodList.length === 0 && <p>No food items added yet.</p>}
        {foodList.map((food, index) => (
          <div key={index} className="food-item">
            <div className="food-details">
              {food.name} - {food.serving} - {food.calories} cal
            </div>
            <button
              className="food-delete-button"
              onClick={() => deleteFoodItem(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodLog;
*/

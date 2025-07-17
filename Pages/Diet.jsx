import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

import Navbar from '../Components/Navbar';
import FoodLog from '../Components/FoodLog';

const Diet = () => {
  return (
    <div className="dietBox">
      <div className="navDiv">
        <Navbar />
      </div>
      <div className="foodLogContainer">
        <FoodLog />
      </div>
    </div>
  );
};

export default Diet;

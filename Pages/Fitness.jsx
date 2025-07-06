import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

import Navbar from '../Components/Navbar';
import ExerciseForm from '../components/ExerciseForm';

const Fitness = () => {
    return (
        <div className = "fitnessBox">
            <div className = "navDiv">
                <Navbar />
            </div>
            <div className = "exerciseForm">
                <ExerciseForm />
            </div>
        </div>
        
    )
}

export default Fitness;
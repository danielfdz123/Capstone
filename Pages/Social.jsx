import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

import Navbar from '../Components/Navbar';

const Social = () => {
    return (
        <div className = "socialBox">
            <div className = "navDiv">
                <Navbar />
            </div>
            <div className = "box1"> Social </div>
        <div className = "box2"> </div>
        <div className = "box3"> </div>
        </div>
    )
}

export default Social;
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/"> Home </Link>
                <Link to="/fitness"> Fitness </Link>
                <Link to="/diet"> Diet </Link>
                <Link to="/history"> History </Link>
                <Link to="/social"> Social </Link>
            </div>
            
            <div className="nav-right">
                <div className="profile-circle" title="Profile Setting"></div>
            </div>
        </nav>

    );
}

export default Navbar;
import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <a href="#home"> Home </a>
                <a href="#fitness"> Fitness </a>
                <a href="#diet"> Diet </a>
                <a href="#history"> History </a>
                <a href="#social"> Social </a>
            </div>
            
            <div className="nav-right">
                <div className="profile-circle" title="Profile Setting"></div>
            </div>
        </nav>

    );
}

export default Navbar;
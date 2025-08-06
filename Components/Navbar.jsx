import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleLogout = () => {
        // Insert actual logout logic here
        console.log('User logged out');
        navigate('/login'); // Redirect to login page
    };

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/home"> Home </Link>
                <Link to="/fitness"> Fitness </Link>
                <Link to="/diet"> Diet </Link>
                <Link to="/history"> History </Link>
                <Link to="/social"> Social </Link>
            </div>

            <div className="nav-right" ref={dropdownRef}>
                <div
                    className="profile-circle"
                    title="Profile Setting"
                    onClick={toggleDropdown}
                ></div>

                {showDropdown && (
                    <div className="profile-dropdown">
                        <Link to="/account-settings">Account Settings</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

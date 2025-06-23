import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './Signup.css';

const Signup = () => {
    const [accountInfo, setAccountInfo] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
    };

    const createAccount = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
        .from('Accounts')
        .insert({
            username: accountInfo.username,
            email: accountInfo.email,
            password: accountInfo.password,
            created_at: new Date().toISOString()
        });
            if (error) {
            console.error('Creat account error:', error.message);
            return;
        }
        console.log('Account created:', data);
        window.location = '/';
    };


    return (
        <div className = "signup-container">
            <h2 className = "signup-title">Sign Up </h2>
            <form onSubmit = {createAccount}>
                <label> Username: </label>
                <input
                    type = "text"
                    name = "username"
                    value = {accountInfo.username}
                    onChange = {handleChange}
                    required
                />
                <br/>

                <label> Email: </label>
                <input
                    type = "email"
                    name = "email"
                    value = {accountInfo.email}
                    onChange = {handleChange}
                    required
                />
                <br/>

                <label> Password: </label>
                <input
                    type = "password"
                    name = "password"
                    value = {accountInfo.password}
                    onChange = {handleChange}
                    required
                />
                <br/>
                <button type="submit"> Create Account </button>
            </form>

            <p> Already have an account? <Link to="/"> Login here </Link> </p>
        </div>
    );
};

export default Signup;

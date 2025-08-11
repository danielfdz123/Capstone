import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './Signup.css';

const Signup = () => {
    const [error, setError] = useState('');
    const [accountInfo, setAccountInfo] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
    });

    const handleChange = (e) => {
        setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
    };

    const createAccount = async (event) => {
        event.preventDefault();
        setError('');
        const { username, email, password, first_name } = accountInfo;
        if (!username.trim() || !email.trim() || !password.trim() || !first_name.trim()) {
            setError('All fields are required.');
            return;
        }

        const { data: existingUsers, error: queryError } = await supabase
            .from('Accounts')
            .select('id, email, username')
            .or(`email.eq.${email},username.eq.${username}`);

        if (queryError) {
            console.error('Error checking for existing user:', queryError.message);
            setError('Something went wrong. Please try again.');
            return;
        }

        if (existingUsers.length > 0) {
            const emailExists = existingUsers.some(user => user.email === email);
            const usernameExists = existingUsers.some(user => user.username === username);
            if (emailExists && usernameExists) {
                setError('Both email and username already exist.');
            } else if (emailExists) {
                setError('Email already exists.');
            } else if (usernameExists) {
                setError('Username already exists.');
            }
            return;
        }

        const { data, error: insertError } = await supabase
            .from('Accounts')
            .insert({
                username,
                email,
                password,
                first_name,
                created_at: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
            })
            .select();

        if (insertError) {
            console.error('Create account error:', insertError.message);
            setError('Account creation failed. Try again.');
            return;
        }

        const newUser = data[0];
        localStorage.setItem('user', JSON.stringify(newUser)); 
        window.location = '/setup';
    };

    return (
        <div className = "signupBox">
            <img src = "logo.png" className="logoImg" />
            <form onSubmit={createAccount}>
                <p className = "signupHeading"> Fill out the form below to create an account!</p>
                <div className = "signupForm">

                    {/* First Name */}
                    <h2>First Name:</h2>
                    <input
                        type="text"
                        name="first_name"
                        value={accountInfo.first_name}
                        onChange={handleChange}
                        required
                    />

                    {/* Username */}
                    <h2>Username:</h2>
                    <input
                        type="text"
                        name="username"
                        value={accountInfo.username}
                        onChange={handleChange}
                        required
                    />

                    {/* Email */}
                    <h2>Email:</h2>
                    <input
                        type="email"
                        name="email"
                        value={accountInfo.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Password */}
                    <h2>Password:</h2>
                    <input
                        type="password"
                        name="password"
                        value={accountInfo.password}
                        onChange={handleChange}
                        required
                    />

                    {/* Error Message */}
                    {error && <p className="error">{error}</p>}

                    {/* Submit Button */}
                    <div className="createAccDiv">
                        <button className = "createAccButton" type="submit">
                            Continue to profile setup
                        </button>
                    </div>
                </div>
            </form>

            <p className="bottomText">
                Already have an account?&nbsp;
                <Link className="bottomText" to="/">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Signup;
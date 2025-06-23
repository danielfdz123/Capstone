import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './Login.css';

const Login = (props) => {
    const [loginInput, setLoginInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            const { data, error } = await supabase
            .from('Accounts')
            .select()
            if (error || !data || data.length === 0) 
            {
                setLoginInput(props.test || []);
            } 
            else
            {
                setLoginInput(data);
            }
        };
        fetchAccounts();
    }, []);

    return (
        <div className = "LoginDiv">
            <div className = 'logoDiv'>

            </div>

            {/* LOGIN STUFF */}
            <h2 className = 'login'> Login </h2>
            <input
                type = "text"
                className = "loginInput"
                placeholder = "Enter username or email"
                // value = {loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
            />

            {/* PASSWORD STUFF */}
            <h2 className = 'password'> Password </h2>
            <input
                type = "password"
                className = "passwordInput"
                placeholder = "Enter password"
                value = {passwordInput}
                onChange = {(e) => setPasswordInput(e.target.value)}
            />
            
            {/* SIGN UP STUFF */}
            <h4 className = 'bottomText'>
                <Link to = "/home"> Login </Link> |
                <Link to = "/signup"> New User? </Link> 
            </h4>
        </div>
    )
}

export default Login;
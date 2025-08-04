import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './Login.css';

const Login = () => {
    const [loginInput, setLoginInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        if (!loginInput.trim() || !passwordInput.trim()) 
        {
            setError('Username & Password are required.');
            return;
        }
        const { data, error } = await supabase
            .from('Accounts')
            .select()
            .eq('username', loginInput)
            .eq('password', passwordInput);

        if (error || !data || data.length === 0) 
        {
            setError('Invalid login credentials >:(');
        } 
        else 
        {
            const user = data[0]; 
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/home');
        }
    };

    return (
        <div className = "loginBox">
            <img src = "/logo.png" className = "logoImg"/>
            <form onSubmit = {handleLogin}>

                {/* LOGIN STUFF */}
                <h2 className = "loginText"> Login </h2>
                <input
                    type = "text"
                    className = "loginInput"
                    placeholder = "Enter username"
                    value = {loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                />

                {/* PASSWORD STUFF */}
                <h2 className = "passwordText">Password</h2>
                <input
                    type = "password"
                    className = "passwordInput"
                    placeholder = "Enter password"
                    value = {passwordInput}
                    onChange = {(e) => setPasswordInput(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
            
                {/* LOGIN/SIGNUP BUTTON STUFF */}
                <div className = 'buttonDiv'>
                    <div className = 'loginBtn'>
                        <button className = "loginButton" type = "submit"> Login </button>
                    </div>
                    <div className = 'signupBtn'>
                        <Link to = "/signup">
                            <button className = "signupButton"> New User? </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;

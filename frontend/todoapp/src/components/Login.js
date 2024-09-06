import React, { useState } from 'react';
import { login } from '../services/authService';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password).then(() => {
            onLogin();
        }).catch(error => {
            console.error('Login Failed', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>  

            <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
            />

            <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />

            <button type='submit'>Login</button> 
        </form>
    );
};

export default Login;
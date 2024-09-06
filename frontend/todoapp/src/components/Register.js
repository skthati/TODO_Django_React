import React, { useState } from "react";    
import { register } from "../services/authService";

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        register(username, email, password)
            .then(() => {
                alert('Registration successful!');
            })
            .catch(error => {
                console.error('Registration failed', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2> Register </h2>

            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            <button type="submit">Register</button>
        </form>
    )

}

export default Register;
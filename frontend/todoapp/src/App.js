import React, { useState } from 'react';
import TodoApp from './components/TodoApp_old';
import Login from './components/Login';
import Register from './components/Register';
import { getCurrentUser, logout } from './services/authService';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getCurrentUser());
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
    };

    return (
        <div className='App'>
            {isAuthenticated ? (
                <div>
                    <TodoApp />
                    <button onClick={handleLogout}>logout</button>
                </div>
            ) : isRegistering ? (
                <Register />
            ) : (
                <Login onLogin={handleLogin} />
            )}

            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Back to Login' : 'Register'}
            </button>
        </div>
    )
}

export default App;
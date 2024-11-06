// src/components/Login.js
import React from 'react';
import axios from 'axios';

function Login() {
    const handleLogin = async (provider) => {
        // Fetch login URL from the backend
        const response = await axios.get(`/auth/${provider}`);
        // Redirect to the login URL
        window.location.href = response.data.url;
    };

    return (
        <div>
            <button onClick={() => handleLogin('github')}>Login with GitHub</button>
            <button onClick={() => handleLogin('gitlab')}>Login with GitLab</button>
            <button onClick={() => handleLogin('bitbucket')}>Login with Bitbucket</button>
        </div>
    );
}

export default Login;

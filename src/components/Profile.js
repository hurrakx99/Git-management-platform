// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user information from the backend
        axios.get('/api/user').then((response) => setUser(response.data));
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>User ID: {user.id}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={() => axios.post('/auth/logout').then(() => setUser(null))}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;

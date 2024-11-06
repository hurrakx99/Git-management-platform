import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import RepoList from './components/RepoList';
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the user is authenticated on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth/check');
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <Router>
            {isAuthenticated && <Navbar />}  {/* Show Navbar only if authenticated */}
            <Routes>
                {/* Redirect to /profile if authenticated, else show Login */}
                <Route 
                    path="/" 
                    element={
                        isAuthenticated ? <Navigate to="/profile" /> : <Login setIsAuthenticated={setIsAuthenticated} />
                    } 
                />
                {/* Protect profile route, redirect to / if not authenticated */}
                <Route 
                    path="/profile" 
                    element={
                        isAuthenticated ? <Profile /> : <Navigate to="/" />
                    } 
                />
                {/* Protect repos route, redirect to / if not authenticated */}
                <Route 
                    path="/repos" 
                    element={
                        isAuthenticated ? <RepoList /> : <Navigate to="/" />
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;

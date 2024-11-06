// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
            <Link to="/profile" style={{ margin: '0 10px' }}>Profile</Link>
            <Link to="/repos" style={{ margin: '0 10px' }}>Repositories</Link>
            <a href="/auth/logout" style={{ margin: '0 10px' }}>Logout</a>
        </nav>
    );
}

export default Navbar;

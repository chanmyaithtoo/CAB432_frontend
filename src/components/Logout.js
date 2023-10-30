import React from 'react';
import { Button } from 'reactstrap';

function Logout({ onLogout }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        onLogout();
    };

    return (
        <Button onClick={handleLogout}>Logout</Button>
    );
}

export default Logout;

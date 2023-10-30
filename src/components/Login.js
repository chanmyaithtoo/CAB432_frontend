import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import { useUser } from '../UserContext'; 

function Login() {
    const navigate = useNavigate();
    const { setIsLoggedIn, setUsername: setGlobalUsername } = useUser(); // Destructure and rename setUsername to avoid conflicts
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToRegister, setRedirectToRegister] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/login`, { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            
            // Set the global user state after successful login
            setGlobalUsername(response.data.username);
            setIsLoggedIn(true);

            // Redirect to the homepage after successful login
            navigate('/');

        } catch (error) {
            console.error(error);
            if (error.response) {
                if (error.response.status === 400 && error.response.data.error === "Invalid username or password") {
                    //setRedirectToRegister(true);
                    setError(error.response.data.error);
                } 
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    if (redirectToRegister) {
        navigate('/register');
        return null; // Render nothing after the redirect
    }

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormGroup>
            <Button type="submit">Login</Button>
        </Form>
    );
}

export default Login;

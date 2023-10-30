import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/register`, { username, password });
            setRedirectToLogin(true);
            setSuccess(response.data.message);
            setError(null);
        } catch (error) {
            setError(error.response.data.error);
            setSuccess(null);
            // Reset the input fields if there's an error
            setUsername('');
            setPassword('');
        }
    };

    const resetError = () => {
        setError(null);
    }

    if (redirectToLogin) {
        navigate('/login');
        return null;
    }

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert color="danger">{error}</Alert>}
            {success && <Alert color="success">{success}</Alert>}
            <FormGroup>
                <Label for="username">Username</Label>
                <Input 
                    type="text" 
                    name="username" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    onFocus={resetError} 
                    required />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    onFocus={resetError} 
                    required />
            </FormGroup>
            <Button type="submit">Register</Button>
        </Form>
    );
}

export default Register;

import React from 'react';
import { Container} from 'reactstrap';
import Login from '../components/Login';

function LoginPage() {
    return (
        <Container>
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
                <h1>Login Page</h1>
            </div>
            <Login />
        </Container>
    );
}


export default LoginPage;

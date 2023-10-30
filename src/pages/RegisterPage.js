import React from 'react';
import { Container} from 'reactstrap';
import Register from '../components/Register';

function RegisterPage() {
    return (
        <Container>
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
                <h1>Register Page</h1>
            </div>
            <Register />
        </Container>
    );
}


export default RegisterPage;

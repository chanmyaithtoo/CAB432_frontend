import React from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { useUser } from '../UserContext';
import Profile from '../components/Profile';

function ProfilePage() {
    const { isLoggedIn, username } = useUser();

    return (
        <Container>
            {isLoggedIn ? (
                <Row>
                    <Col md="12">
                        <Alert color="primary">
                            Welcome to your profile, {username}!
                        </Alert>
                        <Profile username={username} />
                    </Col>
                </Row>
            ) : (
                <div>Please log in to view your profile.</div>
            )}
        </Container>
    );
}

export default ProfilePage;

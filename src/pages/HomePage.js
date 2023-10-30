import React from 'react';
import { Alert } from 'reactstrap';
import { useUser } from '../UserContext';
import Upload from '../components/Upload'; // Import the FileUploadComponent
import Profile from '../components/Profile'; // Import the Profile component

function HomePage() {
    const { isLoggedIn, username } = useUser();

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <Alert color="primary">
                        Welcome to the File Compression App, {username}!
                    </Alert>
                    <Upload username={username} />
                </>
            ) : (
                <div>Welcome to the File Compression App! Please log in or sign up to proceed.</div>
            )}
        </div>
    );
}

export default HomePage;

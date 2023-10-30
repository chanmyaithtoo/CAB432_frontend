import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';  
import ProfilePage from './pages/ProfilePage';
import { UserProvider } from './UserContext';

function App() {
    return (
       <UserProvider>
        <Router>
            <Container>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<HomePage />} /> 
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/profile" element = {<ProfilePage/>}/>
                </Routes>
            </Container>
        </Router>
       </UserProvider>
        
    );
}

export default App;

import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap'; // Import NavLink from 'reactstrap'
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

function NavigationBar() {
    const { isLoggedIn, setIsLoggedIn, setUsername } = useUser();

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername('');
        setIsLoggedIn(false);
    };

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">File Compression App</NavbarBrand>
            <Nav className="ml-auto" navbar>
                {isLoggedIn ? (
                    <>
                        <NavItem className="mr-2">
                            <NavLink tag={Link} to="/profile">Profile</NavLink>  {/* Add this link to the Profile page */}
                        </NavItem>
                        <NavItem>
                            <Button color="danger" onClick={handleLogout}>Logout</Button>
                        </NavItem>
                    </>
                ) : (
                    <>
                        <NavItem className="mr-2">
                            <Link to="/register" className="nav-link">Sign Up</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/login" className="nav-link">Login</Link>
                        </NavItem>
                    </>
                )}
            </Nav>
        </Navbar>
    );
}

export default NavigationBar;

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

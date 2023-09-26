import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const updateSearchQuery = (query) => {
        setSearchQuery(query);
    };

    return (
        <GlobalContext.Provider value={{ searchQuery, updateSearchQuery }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

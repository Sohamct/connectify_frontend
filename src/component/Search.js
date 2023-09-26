import React, { useState } from 'react';

export const Search = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query); // Call the onSearch callback with the query
    }

    return (
        <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
        />
    )
}

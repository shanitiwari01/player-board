import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Search component allows users to enter a search query.
 * @param {string} search - The current search query.
 * @param {function} setSearch - The function to update the search query.
 */
export default function Search({ search, setSearch }) {
    return (
        <OutlinedInput
            startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search'
            className='search-input'
        />
    );
}
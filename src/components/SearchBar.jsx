// components/SearchBar.jsx
import React from 'react';
import { TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative">
      <TextInput
        type="text"
        placeholder="Search phones by name, brand, or model..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
      <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
}

export default SearchBar;
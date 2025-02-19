import React from 'react';
import { useAuthContext } from '../../../../../Hooks/useAuthContext';

const SearchUsers = ({ setSearch }) => {
  const { darkTheme } = useAuthContext();

  return (
    <div className="mb-6 md:mt-4">
      <input
        onChange={e => setSearch(e.target.value)}
        className={`px-3 py-1.5 border-2 border-skyBlue rounded-lg outline-none ${
          darkTheme && 'bg-dark3 text-gray-200'
        }`}
        type="text"
        name="search"
        id="search"
        placeholder="Search Users"
      />
    </div>
  );
};

export default SearchUsers;

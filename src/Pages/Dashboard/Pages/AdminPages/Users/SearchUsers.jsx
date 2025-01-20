import React from 'react';

const SearchUsers = ({ setSearch }) => {
  return (
    <div className="mb-6 md:mt-4">
      <input
        onChange={e => setSearch(e.target.value)}
        className="px-3 py-1.5 border-2 border-skyBlue rounded-lg outline-none"
        type="text"
        name="search"
        id="search"
        placeholder="Search Users"
      />
    </div>
  );
};

export default SearchUsers;

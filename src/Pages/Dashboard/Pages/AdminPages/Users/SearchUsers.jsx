import React from 'react';

const SearchUsers = ({ setSearch }) => {
  return (
    <div className="mb-6">
      <input
        onChange={e => setSearch(e.target.value)}
        className="px-3 py-1.5 border-2 border-[#6d9f78] rounded-lg outline-none"
        type="text"
        name="search"
        id="search"
        placeholder="Search Users"
      />
    </div>
  );
};

export default SearchUsers;

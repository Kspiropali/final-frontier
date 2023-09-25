import React from 'react'

const SearchItem = ({ searchQuery, setSearchQuery }) => {

  return (
    <section className="search-item">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => {
          const searchTerm = e.target.value.toLowerCase();
          setSearchQuery(searchTerm);
        }}
      />
    </section>
  );
};

export default SearchItem
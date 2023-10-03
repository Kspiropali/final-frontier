import React from 'react'

const SearchItem = ({ searchQuery, setSearchQuery }) => {

  return (
    <section className="search-item">
      <input
        type="text"
        className="custom-input"
        placeholder="Search by Name"
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
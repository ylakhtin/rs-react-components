import React from 'react';

class SearchInput extends React.Component {
  render(): React.ReactNode {
    return (
      <input
        type="text"
        className="search-input"
        placeholder="Input search string here..."
      />
    );
  }
}

export default SearchInput;

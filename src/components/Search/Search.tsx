import React, { useState } from 'react';
import { SEARCH_DEFAULT } from '../../data';

interface SearchProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

const Search = function ({ setSearchString }: SearchProps) {
  const [inputValue, setInputValue] = useState('');

  function setValue(searchString: string) {
    setInputValue(searchString);
  }

  function setSearchStringInApp() {
    localStorage.setItem(SEARCH_DEFAULT, inputValue);
    setSearchString(inputValue);
    console.log('New search string is set in localStorage and App state');
  }

  return (
    <div className="search-container">
      <input
        type="text"
        onChange={(event) => setValue(event.target.value)}
        value={inputValue}
        className="search-input"
        placeholder="Input search string here..."
      />
      <button onClick={setSearchStringInApp} className="search-button">
        Search
      </button>
    </div>
  );
};

export default Search;

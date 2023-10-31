import React, { useState } from 'react';
import classes from './Search.module.css';
import { SEARCH_DEFAULT } from '../../data';

interface SearchProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

const Search = function ({ setSearchString }: SearchProps) {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem(SEARCH_DEFAULT) || ''
  );

  function setValue(searchString: string) {
    setInputValue(searchString);
  }

  function setSearchStringInApp() {
    localStorage.setItem(SEARCH_DEFAULT, inputValue);
    setSearchString(inputValue);
    console.log('New search string is set in localStorage and App state');
  }

  return (
    <div className={classes.searchContainer}>
      <input
        type="text"
        onChange={(event) => setValue(event.target.value)}
        value={inputValue}
        className={classes.searchInput}
        placeholder="Input search string here..."
      />
      <button onClick={setSearchStringInApp} className={classes.searchButton}>
        Search
      </button>
    </div>
  );
};

export default Search;

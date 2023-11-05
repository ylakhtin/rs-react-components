import { useState } from 'react';
import classes from './Search.module.css';
import { SEARCH_DEFAULT } from '../../data';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

const Search = function () {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem(SEARCH_DEFAULT) || ''
  );

  function setValue(searchString: string) {
    setInputValue(searchString);
  }

  function setSearchStringInApp() {
    localStorage.setItem(SEARCH_DEFAULT, inputValue);
  }

  return (
    <div className={classes.searchContainer}>
      <Logo />
      <input
        type="text"
        onChange={(event) => setValue(event.target.value)}
        value={inputValue}
        className={classes.searchInput}
        placeholder="Input search string here..."
      />
      <NavLink
        to={inputValue ? `/page/1/search/${inputValue}` : '/page/1'}
        key={inputValue}
      >
        <button onClick={setSearchStringInApp} className={classes.searchButton}>
          Search
        </button>
      </NavLink>
    </div>
  );
};

export default Search;

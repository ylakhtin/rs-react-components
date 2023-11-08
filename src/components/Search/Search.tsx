import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Search.module.css';
import Logo from '../Logo/Logo';
import { SEARCH_DEFAULT } from '../../shared/data/data';

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

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Search.module.css';
import Logo from '../Logo/Logo';
import {
  SEARCH_DEFAULT,
  SEARCH_PLACEHOLDER_TEXT,
} from '../../shared/data/data';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import { searchSlice } from '../../utils/Store/Reducers/SearchReducer';

const Search = function () {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem(SEARCH_DEFAULT) || ''
  );

  const { setRootSearch } = searchSlice.actions;
  const dispatch = useAppDispatch();

  function setValue(searchString: string) {
    setInputValue(searchString);
  }

  function setSearchStringInApp() {
    localStorage.setItem(SEARCH_DEFAULT, inputValue);
    dispatch(setRootSearch(inputValue));
  }

  return (
    <div className={classes.searchContainer}>
      <Logo />
      <input
        type="text"
        onChange={(event) => setValue(event.target.value)}
        value={inputValue}
        className={classes.searchInput}
        placeholder={SEARCH_PLACEHOLDER_TEXT}
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

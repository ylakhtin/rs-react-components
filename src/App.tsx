import React, { useState } from 'react';
import Search from './components/Search/Search';
import Beer from './components/ItemList/ItemList';
import { SEARCH_DEFAULT } from './data';

const App = function () {
  const [searchString, setSearchString] = useState(
    localStorage.getItem(SEARCH_DEFAULT) || ''
  );

  return (
    <div className="main-space">
      <div className="wrapper">
        <Search setSearchString={setSearchString} />
        <Beer searchString={searchString} />
      </div>
    </div>
  );
};

export default App;

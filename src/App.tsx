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
        <section className="box">
          <Search setSearchString={setSearchString} />
        </section>
        <section className="box">
          <Beer searchString={searchString} />
        </section>
      </div>
    </div>
  );
};

export default App;

// import { useState } from 'react';
import Search from './components/Search/Search';
// import { SEARCH_DEFAULT } from './data';
import { Outlet } from 'react-router-dom';

const App = function () {
  // const [searchString, setSearchString] = useState(
  //   localStorage.getItem(SEARCH_DEFAULT) || ''
  // );

  return (
    <div className="main-space">
      <div className="wrapper">
        <Search />
        {/* <ItemList searchString={searchString} /> */}
      </div>
      <Outlet />
    </div>
  );
};

export default App;

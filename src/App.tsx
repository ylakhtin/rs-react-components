import Search from './components/Search/Search';
import { Outlet } from 'react-router-dom';

const App = function () {
  return (
    <div className="main-space">
      <div className="wrapper">
        <Search />
      </div>
      <Outlet />
    </div>
  );
};

export default App;

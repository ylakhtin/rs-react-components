import Search from './components/Search/Search';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = function () {
  return (
    <div className="main-space">
      <ErrorBoundary
        fallback={
          'Error, please, reload the page! This is to test Error boundary! This is a fallback message!'
        }
      >
        <div className="wrapper">
          <Search />
        </div>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

export default App;

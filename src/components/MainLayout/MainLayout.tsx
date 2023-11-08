import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Search from '../Search/Search';
import { Outlet } from 'react-router-dom';

const MainLayout = function () {
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

export default MainLayout;

import { Outlet } from 'react-router-dom';
import classes from './MainLayout.module.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Search from '../Search/Search';

const MainLayout = function () {
  return (
    <div className={classes.mainSpace}>
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

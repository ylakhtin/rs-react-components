import { Outlet } from 'react-router-dom';
import classes from './MainLayout.module.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Search from '../Search/Search';
import { Provider } from 'react-redux';
import { setupStore } from '../../utils/Store/Store';

const MainLayout = function () {
  const store = setupStore();

  return (
    <div className={classes.mainSpace}>
      <ErrorBoundary
        fallback={
          'Error, please, reload the page! This is to test Error boundary! This is a fallback message!'
        }
      >
        <Provider store={store}>
          <div className="wrapper">
            <Search />
          </div>
          <Outlet />
        </Provider>
      </ErrorBoundary>
    </div>
  );
};

export default MainLayout;

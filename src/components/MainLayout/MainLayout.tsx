import { Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';
import classes from './MainLayout.module.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Search from '../Search/Search';
import { IGeneralContext, SEARCH_DEFAULT } from '../../shared/data/data';

export const GeneralContext = createContext<IGeneralContext | null>(null);

const MainLayout = function () {
  const [mainString, setMainString] = useState(
    localStorage.getItem(SEARCH_DEFAULT) || ''
  );

  return (
    <div className={classes.mainSpace}>
      <ErrorBoundary
        fallback={
          'Error, please, reload the page! This is to test Error boundary! This is a fallback message!'
        }
      >
        <div className="wrapper">
          <GeneralContext.Provider value={{ mainString, setMainString }}>
            <Search />
          </GeneralContext.Provider>
        </div>
        <GeneralContext.Provider value={{ mainString, setMainString }}>
          <Outlet />
        </GeneralContext.Provider>
      </ErrorBoundary>
    </div>
  );
};

export default MainLayout;

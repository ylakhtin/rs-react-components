import { Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';
import classes from './MainLayout.module.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Search from '../Search/Search';
import {
  EMPTY_ITEMS_ARRAY,
  SEARCH_DEFAULT,
  IGeneralContext,
} from '../../shared/data/data';

export const GeneralContext = createContext<IGeneralContext | null>(null);

const MainLayout = function () {
  const [mainString, setMainString] = useState(
    localStorage.getItem(SEARCH_DEFAULT) || ''
  );
  const [beerList, setBeerList] = useState(EMPTY_ITEMS_ARRAY);

  return (
    <div className={classes.mainSpace}>
      <ErrorBoundary
        fallback={
          'Error, please, reload the page! This is to test Error boundary! This is a fallback message!'
        }
      >
        <GeneralContext.Provider
          value={{ mainString, setMainString, beerList, setBeerList }}
        >
          <div className="wrapper">
            <Search />
          </div>
          <Outlet />
        </GeneralContext.Provider>
      </ErrorBoundary>
    </div>
  );
};

export default MainLayout;

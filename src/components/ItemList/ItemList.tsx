import { useState, useEffect, createContext } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import classes from './ItemList.module.css';
import Paginator from '../Paginator/Paginator';
import Loader from '../Loader/Loader';
import { queryItems } from '../API/API';
import {
  SEARCH_DEFAULT,
  MAX_AMOUNT,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_ITEMS_PER_PAGE,
} from '../../shared/data/data';
import Item from '../Item/Item';
import Matches from '../Matches/Matches';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { searchSlice } from '../../utils/Store/Reducers/SearchReducer';
import { itemListSlice } from '../../utils/Store/Reducers/ItemListReducer';

export const DataFromChildContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

const ItemList = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [requestOK, setRequestOK] = useState(true);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [perPage, setPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  const navigate = useNavigate();

  const {
    pageNum = DEFAULT_PAGE_NUMBER,
    searchStr = localStorage.getItem(SEARCH_DEFAULT) || '',
    index,
  } = useParams();

  const searchRootString = useAppSelector(
    (state) => state.searchSliceReducer.searchRootString
  );
  const itemRootList = useAppSelector(
    (state) => state.itemListReducer.beerList
  );
  const { setItemList } = itemListSlice.actions;
  const { setRootSearch } = searchSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchStr) {
      // genContext?.setMainString(searchStr);
      dispatch(setRootSearch(searchStr));
    } else {
      // genContext?.setMainString('');
      dispatch(setRootSearch(''));
    }
    if (pageNum) {
      setPageNumber(Number(pageNum));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchRootString, pageNum, searchStr]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const [requestOKCandidate, beerListCandidate] = await queryItems(
        searchRootString,
        pageNumber,
        perPage
      );

      setRequestOK(requestOKCandidate);
      if (Array.isArray(beerListCandidate)) {
        // genContext?.setBeerList(beerListCandidate);
        dispatch(setItemList(beerListCandidate));
      }

      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, searchRootString, perPage]);

  async function prevPage(): Promise<void> {
    if (pageNumber - 1 >= 1) {
      if (searchRootString) {
        navigate(`/page/${pageNumber - 1}/search/${searchRootString}`);
      } else {
        navigate(`/page/${pageNumber - 1}`);
      }
    }
  }

  async function nextPage(): Promise<void> {
    const limit = Math.ceil(MAX_AMOUNT / perPage);
    if (pageNumber + 1 <= limit) {
      if (searchRootString) {
        navigate(`/page/${pageNumber + 1}/search/${searchRootString}`);
      } else {
        navigate(`/page/${pageNumber + 1}`);
      }
    }
  }

  function setRightSectionState() {
    if (!index) {
      setSectionOpen(true);
    } else {
      setSectionOpen(false);
    }
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Matches
            listLength={itemRootList.length as number}
            requestOK={requestOK}
          />
          <div className={classes.filler}>
            {requestOK ? (
              <div>
                {isLoading ? (
                  <Loader />
                ) : (
                  itemRootList.map((beer, index) => (
                    <Item
                      setRightSectionState={setRightSectionState}
                      beer={beer}
                      pageNumber={pageNumber}
                      sectionOpen={sectionOpen}
                      id={itemRootList[index].id}
                      key={itemRootList[index].id}
                    />
                  ))
                )}
              </div>
            ) : (
              <div className={classes.loader}>Bad request</div>
            )}
          </div>
        </div>
        <DataFromChildContext.Provider value={setSectionOpen}>
          <Outlet />
        </DataFromChildContext.Provider>
      </div>
      <Paginator
        prevPage={prevPage}
        nextPage={nextPage}
        setPageNum={setPageNumber}
        setPerPage={setPerPage}
        perPage={perPage}
        pageNumber={pageNumber}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ItemList;

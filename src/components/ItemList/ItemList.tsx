import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import classes from './ItemList.module.css';
import Paginator from '../Paginator/Paginator';
import Loader from '../Loader/Loader';
import { buildQueryString } from '../../utils/StringBuilder/StringBuilder';
import {
  SEARCH_DEFAULT,
  MAX_AMOUNT,
  DEFAULT_PAGE_NUMBER,
} from '../../shared/data/data';
import Item from '../Item/Item';
import Matches from '../Matches/Matches';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { searchSlice } from '../../utils/Store/Reducers/SearchReducer';
import { itemListSlice } from '../../utils/Store/Reducers/ItemListReducer';
import { detailsOpenSlice } from '../../utils/Store/Reducers/ItemDetailsReducer';
import { beerAPI } from '../../utils/services/BeerService';

const ItemList = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [requestOK, setRequestOK] = useState(true);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);

  const navigate = useNavigate();

  const {
    pageNum = DEFAULT_PAGE_NUMBER,
    searchStr = localStorage.getItem(SEARCH_DEFAULT) || '',
    index,
  } = useParams();

  const searchRootString = useAppSelector(
    (state) => state.searchSliceReducer.searchRootString
  );

  const sectionOpen = useAppSelector(
    (state) => state.itemDetailsReducer.sectionOpen
  );
  const perPage = useAppSelector((state) => state.perPageReducer.perPage);
  const { setDetailsOpen } = detailsOpenSlice.actions;
  const { setItemList } = itemListSlice.actions;
  const { setRootSearch } = searchSlice.actions;
  const dispatch = useAppDispatch();
  const [queryString, setQueryString] = useState(
    buildQueryString(searchRootString, pageNumber, perPage)
  );

  const { data } = beerAPI.useFetchDataQuery(queryString);

  useEffect(() => {
    if (searchStr) {
      dispatch(setRootSearch(searchStr));
    } else {
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

      setQueryString(buildQueryString(searchRootString, pageNumber, perPage));

      if (Array.isArray(data)) {
        setRequestOK(true);
        dispatch(setItemList(data));
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
      dispatch(setDetailsOpen(true));
    } else {
      dispatch(setDetailsOpen(false));
    }
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Matches
            listLength={data ? (data.length as number) : 0}
            requestOK={requestOK}
          />
          <div className={classes.filler}>
            {requestOK ? (
              <div>
                {data ? (
                  data.map((beer, index) => (
                    <Item
                      setRightSectionState={setRightSectionState}
                      beer={beer}
                      pageNumber={pageNumber}
                      sectionOpen={sectionOpen}
                      id={data[index].id}
                      key={data[index].id}
                    />
                  ))
                ) : (
                  <Loader />
                )}
              </div>
            ) : (
              <div className={classes.loader}>Bad request</div>
            )}
          </div>
        </div>
        <Outlet />
      </div>
      <Paginator
        prevPage={prevPage}
        nextPage={nextPage}
        setPageNum={setPageNumber}
        pageNumber={pageNumber}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ItemList;

import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import classes from './ItemList.module.css';
import Paginator from '../Paginator/Paginator';
import Loader from '../Loader/Loader';
import { buildQueryString } from '../../utils/StringBuilder/StringBuilder';
import { SEARCH_DEFAULT, MAX_AMOUNT, DEFAULT_PAGE_NUMBER } from '../../shared/data/data';
import Item from '../Item/Item';
import Matches from '../Matches/Matches';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { searchSlice } from '../../utils/Store/Reducers/SearchReducer';
import { itemListSlice } from '../../utils/Store/Reducers/ItemListReducer';
import { detailsOpenSlice } from '../../utils/Store/Reducers/ItemDetailsReducer';
import { beerAPI } from '../../utils/services/BeerService';
import { listLoadingSlice } from '../../utils/Store/Reducers/ListLoadReducer';

const ItemList = function () {
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);

  const navigate = useNavigate();

  const {
    pageNum = DEFAULT_PAGE_NUMBER,
    searchStr = localStorage.getItem(SEARCH_DEFAULT) || '',
    index,
  } = useParams();

  const searchRootString = useAppSelector((state) => state.searchSliceReducer.searchRootString);

  const sectionOpen = useAppSelector((state) => state.itemDetailsReducer.sectionOpen);
  const perPage = useAppSelector((state) => state.perPageReducer.perPage);

  const { setDetailsOpen } = detailsOpenSlice.actions;
  const { setItemList } = itemListSlice.actions;
  const { setRootSearch } = searchSlice.actions;
  const { setListLoading } = listLoadingSlice.actions;

  const dispatch = useAppDispatch();
  const [queryString, setQueryString] = useState(
    buildQueryString(searchRootString, pageNumber, perPage)
  );

  const { data, error, isLoading, isFetching } = beerAPI.useFetchDataQuery(queryString);

  useEffect(() => {
    dispatch(setListLoading(isFetching));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

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
    setQueryString(buildQueryString(searchRootString, pageNumber, perPage));

    if (Array.isArray(data)) {
      dispatch(setItemList(data));
    }

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
          <Matches listLength={data ? (data.length as number) : 0} requestOK={!error} />
          <div className={classes.filler}>
            {error ? (
              <div>Bad request</div>
            ) : (
              <div className={classes.content}>
                {isFetching && <Loader />}
                {!isFetching &&
                  data?.map((beer, index) => (
                    <Item
                      setRightSectionState={setRightSectionState}
                      beer={beer}
                      pageNumber={pageNumber}
                      sectionOpen={sectionOpen}
                      id={data[index].id}
                      key={data[index].id}
                    />
                  ))}
              </div>
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

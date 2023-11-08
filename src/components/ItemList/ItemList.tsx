import { useState, useEffect, useCallback, createContext } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import classes from './ItemList.module.css';
import Paginator from '../Paginator/Paginator';
import Loader from '../Loader/Loader';
import { queryItems } from '../API/API';
import { EMPTY_ITEMS_ARRAY } from './data';
import { SEARCH_DEFAULT } from '../../shared/data/data';
import { MAX_AMOUNT } from '../../shared/data/data';

export const DataFromChildContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

const ItemList = function () {
  const [beerList, setBeerList] = useState(EMPTY_ITEMS_ARRAY);
  const [isLoading, setIsLoading] = useState(false);
  const [requestOK, setRequestOK] = useState(true);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const navigate = useNavigate();

  const {
    pageNum = 1,
    searchStr = localStorage.getItem(SEARCH_DEFAULT) || '',
    index,
  } = useParams();

  const queryData = useCallback(
    async (pageNumber: number) => {
      setIsLoading(true);

      const [requestOKCandidate, beerListCandidate] = await queryItems(
        searchText,
        pageNumber,
        perPage
      );

      setRequestOK(requestOKCandidate);
      if (Array.isArray(beerListCandidate)) {
        setBeerList(beerListCandidate);
      }

      setIsLoading(false);
    },
    [perPage, searchText]
  );

  useEffect(() => {
    if (searchStr) {
      setSearchText(searchStr);
    } else {
      setSearchText('');
    }
    if (pageNum) {
      setPageNumber(Number(pageNum));
    }
  }, [pageNum, searchStr]);

  useEffect(() => {
    queryData(pageNumber);
  }, [pageNumber, searchText, queryData]);

  async function prevPage(): Promise<void> {
    if (pageNumber - 1 >= 1) {
      if (searchText) {
        navigate(`/page/${pageNumber - 1}/search/${searchText}`);
      } else {
        navigate(`/page/${pageNumber - 1}`);
      }
    }
  }

  async function nextPage(): Promise<void> {
    const limit = Math.ceil(MAX_AMOUNT / perPage);
    if (pageNumber + 1 <= limit) {
      if (searchText) {
        navigate(`/page/${pageNumber + 1}/search/${searchText}`);
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
          <div>
            {!beerList.length || !requestOK ? (
              <div className={classes.matches}>No matches found</div>
            ) : (
              <div className={classes.matches}>
                Matches on this page: {beerList.length}
              </div>
            )}
          </div>
          <div className={classes.filler}>
            {!requestOK ? (
              <div className={classes.loader}>Bad request</div>
            ) : (
              <div>
                {isLoading ? (
                  <Loader />
                ) : (
                  beerList.map((beer, index) => (
                    <NavLink
                      to={
                        searchText
                          ? `/page/${pageNumber}/search/${searchText}${
                              sectionOpen
                                ? ``
                                : `/details/${Number(beerList[index].id)}`
                            }`
                          : `/page/${pageNumber}${
                              sectionOpen
                                ? ``
                                : `/details/${Number(beerList[index].id)}`
                            }`
                      }
                      key={beerList[index].id}
                    >
                      <div
                        className={classes.flexContainer}
                        key={index}
                        onClick={setRightSectionState}
                      >
                        <div className={classes.imageContainer}>
                          <img
                            className={classes.itemImage}
                            key={index}
                            src={beer.image_url}
                            alt={beer.name}
                          />
                        </div>
                        <div className={classes.dataContainer}>
                          <div>{beer.name}</div>
                          <div>{beer.tagline}</div>
                          <div>Volume: {beer.abv}%</div>
                        </div>
                      </div>
                    </NavLink>
                  ))
                )}
              </div>
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
        searchString={searchText}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ItemList;

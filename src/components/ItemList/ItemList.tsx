import { useState, useEffect, useCallback } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import classes from './ItemList.module.css';
import { queryItems } from '../API/API';
import Paginator from '../Paginator/Paginator';
import { EMPTY_ITEMS_ARRAY } from './data';
import { SEARCH_DEFAULT } from '../../data';

const ItemList = function () {
  const [beerList, setBeerList] = useState(EMPTY_ITEMS_ARRAY);
  const [isLoading, setIsLoading] = useState(false);
  const [requestOK, setRequestOK] = useState(true);
  // query parameters:
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const navigate = useNavigate();

  const {
    pageNum = 1,
    searchStr = localStorage.getItem(SEARCH_DEFAULT) || '',
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
    if (searchText) {
      navigate(`/page/${pageNumber - 1}/search/${searchText}`);
    } else {
      navigate(`/page/${pageNumber - 1}`);
    }
  }

  async function nextPage(): Promise<void> {
    if (searchText) {
      navigate(`/page/${pageNumber + 1}/search/${searchText}`);
    } else {
      navigate(`/page/${pageNumber + 1}`);
    }
  }

  return (
    <div>
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
                  <div className={classes.loader}>
                    <div>Loading, please wait...</div>
                  </div>
                ) : (
                  beerList.map((beer, index) => (
                    <NavLink
                      to={`/beers/details/${Number(beerList[index].id)}`}
                      key={beerList[index].id}
                    >
                      <div className={classes.flexContainer} key={index}>
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
        <Outlet />
      </div>
      <Paginator
        prevPage={prevPage}
        nextPage={nextPage}
        setPageNum={setPageNumber}
        setPerPage={setPerPage}
        pageNumber={pageNumber}
        searchString={searchText}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ItemList;

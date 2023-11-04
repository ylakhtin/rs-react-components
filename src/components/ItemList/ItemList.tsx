import { useState, useEffect, useCallback } from 'react';
import classes from './ItemList.module.css';
import { EMPTY_ITEMS_ARRAY } from './data';
import { queryItems } from '../API/API';
import Paginator from '../Paginator/Paginator';
import { NavLink, Outlet, useParams } from 'react-router-dom';

const ItemList = function () {
  const [beerList, setBeerList] = useState(EMPTY_ITEMS_ARRAY);
  const [isLoading, setIsLoading] = useState(false);
  const [requestOK, setRequestOK] = useState(true);
  // query parameters:
  const [searchText, setSearchText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage] = useState(4);

  const { pageNum, searchStr } = useParams();

  const queryData = useCallback(
    async (pageNumber: number) => {
      setIsLoading(true);

      const [requestOKCandidate, beerListCandidate] = await queryItems(
        searchText,
        pageNumber
      );

      setRequestOK(requestOKCandidate);
      if (Array.isArray(beerListCandidate)) {
        setBeerList(beerListCandidate);
      }

      setIsLoading(false);
    },
    [searchText]
  );

  useEffect(() => {
    if (searchStr) {
      setSearchText(searchStr);
    }
    if (pageNum) {
      setPageNumber(Number(pageNum));
    }
  }, [pageNum, searchStr]);

  useEffect(() => {
    queryData(pageNumber);
  }, [pageNumber, searchText, queryData]);

  function prevPage(): void {
    if (pageNumber - 1 >= 1) {
      setPageNumber(pageNumber - 1);
    }
    queryData(pageNumber);
    console.log('pageNumber in ItemList component - ', pageNumber);
  }

  function nextPage(): void {
    if (pageNumber + 1 <= maxPage) {
      setPageNumber(pageNumber + 1);
    }
    queryData(pageNumber);
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div>
          {!beerList.length || !requestOK ? (
            <div>No matches found</div>
          ) : (
            <div>Matches on this page: {beerList.length}</div>
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
        <Paginator
          prevPage={prevPage}
          nextPage={nextPage}
          pageNumber={pageNumber}
          searchString={searchText}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default ItemList;

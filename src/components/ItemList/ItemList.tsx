import { useState, useEffect, useCallback } from 'react';
import classes from './ItemList.module.css';
import { EMPTY_ITEMS_ARRAY } from './data';
import queryItems from '../API/API';
import Paginator from '../Paginator/Paginator';

const ItemList = function (props: { searchString: string | null }) {
  const [beerList, setBeerList] = useState(EMPTY_ITEMS_ARRAY);
  const [isLoading, setIsLoading] = useState(false);
  const [requestOK, setRequestOK] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage] = useState(4);

  const queryData = useCallback(
    async (pageNumber: number) => {
      setIsLoading(true);

      const [requestOKCandidate, beerListCandidate] = await queryItems(
        props.searchString,
        pageNumber
      );

      setRequestOK(requestOKCandidate);
      if (Array.isArray(beerListCandidate)) {
        setBeerList(beerListCandidate);
      }

      setIsLoading(false);
    },
    [props.searchString]
  );

  useEffect(() => {
    queryData(pageNumber);
  }, [pageNumber, props.searchString, queryData]);

  function prevPage(): void {
    if (pageNumber - 1 >= 1) {
      setPageNumber(pageNumber - 1);
    }
    queryData(pageNumber);
  }

  function nextPage(): void {
    if (pageNumber + 1 <= maxPage) {
      setPageNumber(pageNumber + 1);
    }
    queryData(pageNumber);
  }

  return (
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
            <div>
              {isLoading ? (
                <div className={classes.loader}>
                  <div>Loading, please wait...</div>
                </div>
              ) : (
                beerList.map((beer, index) => (
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
                      <div>{beer.description}</div>
                      <div>First brewed: {beer.first_brewed}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <Paginator
        prevPage={prevPage}
        nextPage={nextPage}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default ItemList;

import React, { useState, useEffect } from 'react';
import { EMPTY_ITEMS_ARRAY } from './data';
import queryItems from '../API/API';

const ItemList = function (props: { searchString: string | null }) {
  const [beerList, setBeerList] = useState(EMPTY_ITEMS_ARRAY);
  const [isLoading, setIsLoading] = useState(false);
  const [requestOK, setRequestOK] = useState(true);

  useEffect(() => {
    async function queryData() {
      setIsLoading(true);

      const [requestOKCandidate, beerListCandidate] = await queryItems(
        props.searchString
      );

      setRequestOK(requestOKCandidate);
      if (Array.isArray(beerListCandidate)) {
        setBeerList(beerListCandidate);
      }

      setIsLoading(false);
    }

    queryData();
  }, [props.searchString]);

  return (
    <div>
      <div>
        {!beerList.length || !requestOK ? (
          <div>No matches found</div>
        ) : (
          <div>Matches on this page: {beerList.length}</div>
        )}
      </div>
      <div>
        {!requestOK ? (
          <div className="loader">Bad request</div>
        ) : (
          <div>
            {isLoading ? (
              <div className="loader">Loading, please wait...</div>
            ) : (
              beerList.map((beer, index) => (
                <div className="flex-container" key={index}>
                  <div className="data-container">
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
        )}
      </div>
    </div>
  );
};

export default ItemList;

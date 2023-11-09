import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import classes from './ItemList.module.css';
import Paginator from '../Paginator/Paginator';
import Loader from '../Loader/Loader';
import { queryItems } from '../API/API';
import {
  EMPTY_ITEMS_ARRAY,
  SEARCH_DEFAULT,
  MAX_AMOUNT,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_ITEMS_PER_PAGE,
  IGeneralContext,
} from '../../shared/data/data';
import Item from '../Item/Item';
import Matches from '../Matches/Matches';
import { GeneralContext } from '../MainLayout/MainLayout';

export const DataFromChildContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

const ItemList = function () {
  const [beerList, setBeerList] = useState(EMPTY_ITEMS_ARRAY);
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

  const genContext: IGeneralContext | null = useContext(GeneralContext);

  const queryData = useCallback(
    async (pageNumber: number) => {
      setIsLoading(true);

      const [requestOKCandidate, beerListCandidate] = await queryItems(
        genContext?.mainString as string,
        pageNumber,
        perPage
      );

      setRequestOK(requestOKCandidate);
      if (Array.isArray(beerListCandidate)) {
        setBeerList(beerListCandidate);
      }

      setIsLoading(false);
    },
    [genContext?.mainString, perPage]
  );

  useEffect(() => {
    if (searchStr) {
      genContext?.setMainString(searchStr);
    } else {
      genContext?.setMainString('');
    }
    if (pageNum) {
      setPageNumber(Number(pageNum));
    }
  }, [genContext, pageNum, searchStr]);

  useEffect(() => {
    queryData(pageNumber);
  }, [pageNumber, genContext?.mainString, queryData]);

  async function prevPage(): Promise<void> {
    if (pageNumber - 1 >= 1) {
      if (genContext?.mainString) {
        navigate(`/page/${pageNumber - 1}/search/${genContext?.mainString}`);
      } else {
        navigate(`/page/${pageNumber - 1}`);
      }
    }
  }

  async function nextPage(): Promise<void> {
    const limit = Math.ceil(MAX_AMOUNT / perPage);
    if (pageNumber + 1 <= limit) {
      if (genContext?.mainString) {
        navigate(`/page/${pageNumber + 1}/search/${genContext?.mainString}`);
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
          <Matches listLength={beerList.length} requestOK={requestOK} />
          <div className={classes.filler}>
            {requestOK ? (
              <div>
                {isLoading ? (
                  <Loader />
                ) : (
                  beerList.map((beer, index) => (
                    <Item
                      setRightSectionState={setRightSectionState}
                      beer={beer}
                      pageNumber={pageNumber}
                      sectionOpen={sectionOpen}
                      id={beerList[index].id}
                      key={beerList[index].id}
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

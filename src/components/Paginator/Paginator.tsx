import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Paginator.module.css';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_ITEMS_PER_PAGE,
  ITEMS_PER_PAGE,
  IGeneralContext,
} from '../../shared/data/data';
import { GeneralContext } from '../MainLayout/MainLayout';

function Paginator(props: {
  prevPage: () => void;
  nextPage: () => void;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  pageNumber: number;
  isLoading: boolean;
}) {
  const [page, setPage] = useState(props.pageNumber);
  const navigate = useNavigate();
  const genContext: IGeneralContext | null = useContext(GeneralContext);

  useEffect(() => {
    setPage(props.pageNumber);
  }, [props.pageNumber]);

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      props.setPageNum(page);
      doNavigate(genContext?.mainString, page);
    }
  }

  function doNavigate(searchString: string | undefined, pageNumber: number) {
    if (searchString) {
      navigate(`/page/${pageNumber}/search/${searchString}`);
    } else {
      navigate(`/page/${pageNumber}`);
    }
  }

  function setItemsPerPage(event: React.ChangeEvent<HTMLSelectElement>): void {
    props.setPerPage(Number(event.target.value));
    doNavigate(genContext?.mainString, DEFAULT_PAGE_NUMBER);
  }

  return (
    <div>
      {!props.isLoading && (
        <div className={classes.mainContainer}>
          <div className={classes.container}>
            <button onClick={props.prevPage}>Prev</button>
            <input
              type="number"
              value={page}
              placeholder="pageNum"
              onChange={(event) => setPage(Number(event.target.value))}
              onKeyDown={handleKeyPress}
            />
            <button onClick={props.nextPage}>Next</button>
          </div>
          <div className={classes.itemsPerPage}>
            <span>Items amount: </span>
            <select name="perPage" id="itemsPerPage" onChange={setItemsPerPage}>
              <option value={props.perPage}>{props.perPage} per page</option>
              <option
                value={
                  props.perPage === DEFAULT_ITEMS_PER_PAGE
                    ? ITEMS_PER_PAGE
                    : DEFAULT_ITEMS_PER_PAGE
                }
              >
                {props.perPage === DEFAULT_ITEMS_PER_PAGE
                  ? ITEMS_PER_PAGE
                  : DEFAULT_ITEMS_PER_PAGE}{' '}
                per page
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default Paginator;

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Paginator.module.css';
import {
  ENTER_MESSAGE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_ITEMS_PER_PAGE,
  ITEMS_PER_PAGE,
} from '../../shared/data/data';

function Paginator(props: {
  prevPage: () => void;
  nextPage: () => void;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  pageNumber: number;
  searchString: string;
  isLoading: boolean;
}) {
  const [page, setPage] = useState(props.pageNumber);
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState('');
  const messageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(props.pageNumber);
  }, [props.pageNumber]);

  useEffect(() => {
    if (showHint && messageRef.current) {
      setMessage(ENTER_MESSAGE);
    }
  }, [showHint]);

  function showMessage() {
    setShowHint(true);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setShowHint(false);
      if (messageRef.current) {
        setMessage('');
      }
      props.setPageNum(page);

      let url = '/page/' + page;

      if (props.searchString) {
        url += '/search/' + props.searchString;
      }
      navigate(url);
    }
  }

  function setItemsPerPage(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setPerPage(Number(event.target.value));
    if (props.searchString) {
      navigate(`/page/${DEFAULT_PAGE_NUMBER}/search/${props.searchString}`);
    } else {
      navigate(`/page/${DEFAULT_PAGE_NUMBER}`);
    }
  }

  return (
    <div>
      {!props.isLoading && (
        <div className={classes.mainContainer}>
          <div ref={messageRef} className={classes.message}>
            {message}
          </div>
          <div className={classes.container}>
            <button onClick={props.prevPage}>Prev</button>
            <input
              type="number"
              value={page}
              onChange={(event) => setPage(Number(event.target.value))}
              onClick={showMessage}
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

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Paginator.module.css';
import ENTER_MESSAGE from './data';

function Paginator(props: {
  prevPage: () => void;
  nextPage: () => void;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  searchString: string;
}) {
  const [page, setPage] = useState(props.pageNumber);
  const [showHint, setShowHint] = useState(false);
  const messageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(props.pageNumber);
  }, [props.pageNumber]);

  function showMessage() {
    setShowHint(true);
  }

  useEffect(() => {
    if (showHint && messageRef.current) {
      (messageRef.current as HTMLDivElement).textContent = ENTER_MESSAGE;
    }
  }, [showHint]);

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setShowHint(false);
      if (messageRef.current) {
        (messageRef.current as HTMLDivElement).textContent = '';
      }
      props.setPageNum(page);
    }
  }

  function setItemsPerPage(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setPerPage(Number(event.target.value));
    if (props.searchString) {
      navigate(`/page/${1}/search/${props.searchString}`);
    } else {
      navigate(`/page/${1}`);
    }
  }

  return (
    <div>
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
          <option value="4">4 per page</option>
          <option value="10">10 per page</option>
        </select>
      </div>
      <div ref={messageRef} className={classes.message}></div>
    </div>
  );
}

export default Paginator;

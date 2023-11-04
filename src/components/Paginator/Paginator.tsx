import { useState, useEffect } from 'react';
import classes from './Paginator.module.css';
import { NavLink } from 'react-router-dom';

function Paginator(props: {
  prevPage: () => void;
  nextPage: () => void;
  pageNumber: number;
  searchString: string;
}) {
  const [searchString, setSearchString] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (props.searchString) {
      console.log(page);
      setSearchString(
        `/page/${props.pageNumber + 1}/search/${props.searchString}`
      );
    } else {
      setSearchString(`/page/${props.pageNumber + 1}`);
    }
  }, [page, props.pageNumber, props.searchString]);

  function previousPage() {
    setPage(page - 1);
    props.prevPage();
  }

  function nextPage() {
    setPage(page + 1);
    props.nextPage();
  }

  return (
    <div className={classes.container}>
      <NavLink to={searchString}>
        <button onClick={previousPage}>Prev</button>
      </NavLink>
      <div>{props.pageNumber}</div>
      <NavLink to={searchString}>
        <button onClick={nextPage}>Next</button>
      </NavLink>
    </div>
  );
}

export default Paginator;

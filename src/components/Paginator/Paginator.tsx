import React from 'react';
import classes from './Paginator.module.css';

function Paginator(props: {
  prevPage: () => void;
  nextPage: () => void;
  pageNumber: number;
}) {
  return (
    <div className={classes.container}>
      <button onClick={props.prevPage}>Prev</button>
      <input type="number" value={props.pageNumber} />
      <button onClick={props.nextPage}>Next</button>
    </div>
  );
}

export default Paginator;

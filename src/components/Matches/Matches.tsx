import classes from './Matches.module.css';

function Matches(props: { listLength: number; requestOK: boolean }) {
  return (
    <div>
      {props.listLength && props.requestOK ? (
        <span className={classes.matches}>Matches on this page: {props.listLength}</span>
      ) : (
        <span className={classes.matches}>No matches found</span>
      )}
    </div>
  );
}

export default Matches;

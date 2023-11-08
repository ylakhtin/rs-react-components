import classes from './Matches.module.css';

function Matches(props: { listLength: number; requestOK: boolean }) {
  return (
    <div>
      {props.listLength && props.requestOK ? (
        <div className={classes.matches}>
          Matches on this page: {props.listLength}
        </div>
      ) : (
        <div className={classes.matches}>No matches found</div>
      )}
    </div>
  );
}

export default Matches;

import classes from './Loader.module.css';

const Loader = function () {
  return (
    <div className={classes.loader}>
      <div>Loading, please wait...</div>
    </div>
  );
};

export default Loader;

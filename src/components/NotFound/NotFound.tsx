import classes from './NotFound.module.css';
import { PAGE_NOT_FOUND_MESSAGE } from '../../shared/data/data';

const NotFound = function () {
  return (
    <div className={classes.container}>
      <span>{PAGE_NOT_FOUND_MESSAGE}</span>
    </div>
  );
};

export default NotFound;

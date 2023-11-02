import classes from './ItemDetails.module.css';

const ItemDetails = function () {
  return (
    <div className={classes.wrapper}>
      <div>Details: </div>
      <div>Brewed first: </div>
    </div>
  );
};

export default ItemDetails;

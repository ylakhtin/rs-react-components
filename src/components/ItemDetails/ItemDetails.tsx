import { NavLink, useParams } from 'react-router-dom';
import classes from './ItemDetails.module.css';
import { SINGLE_BEER } from '../../shared/data/data';
import Loader from '../Loader/Loader';
import { beerAPI } from '../../utils/services/BeerService';
import { detailsOpenSlice } from '../../utils/Store/Reducers/ItemDetailsReducer';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';

const ItemDetails = function () {
  const { index } = useParams();
  const { data } = beerAPI.useFetchDataQuery(SINGLE_BEER + index);
  const { setDetailsOpen } = detailsOpenSlice.actions;
  const dispatch = useAppDispatch();

  function closeSection() {
    dispatch(setDetailsOpen(false));
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.closeButton}>
        <NavLink to="..">
          <button onClick={closeSection}>Close</button>
        </NavLink>
      </div>
      {!data ? (
        <Loader />
      ) : (
        <div className={classes.dataContainer}>
          <div>
            <span>Description: </span> {data[0].description}
          </div>
          <div>
            <span>Brewed first: </span>
            {data[0].first_brewed}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;

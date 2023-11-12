import { useState, useEffect, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classes from './ItemDetails.module.css';
import { queryItem } from '../API/API';
import { IBeerDetails, EMPTY_ITEMS_ARRAY } from '../../shared/data/data';
import Loader from '../Loader/Loader';
import { DataFromChildContext } from '../ItemList/ItemList';

const ItemDetails = function () {
  const { index } = useParams();
  const [itemData, setItemData] = useState<IBeerDetails[]>(EMPTY_ITEMS_ARRAY);
  const [isLoading, setIsLoading] = useState(false);
  const setSectionOpen: React.Dispatch<React.SetStateAction<boolean>> | null =
    useContext(DataFromChildContext);

  useEffect(() => {
    async function setItemDetails(): Promise<void> {
      setIsLoading(true);
      const details: IBeerDetails[] = await queryItem(Number(index));
      setItemData(details);
      setIsLoading(false);
    }
    setItemDetails();
  }, [index]);

  function closeSection() {
    if (setSectionOpen) {
      setSectionOpen(false);
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.closeButton}>
        <NavLink to="..">
          <button onClick={closeSection}>Close</button>
        </NavLink>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.dataContainer}>
          <div>
            <span>Description: </span> {itemData[0].description}
          </div>
          <div>
            <span>Brewed first: </span>
            {itemData[0].first_brewed}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;

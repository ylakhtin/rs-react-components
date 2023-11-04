import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from './ItemDetails.module.css';
import { queryItem } from '../API/API';
import { IBeerDetails } from '../ItemList/data';
import { EMPTY_ITEMS_ARRAY } from '../ItemList/data';

const ItemDetails = function () {
  const { index } = useParams();
  const [itemData, setItemData] = useState<IBeerDetails[]>(EMPTY_ITEMS_ARRAY);

  useEffect(() => {
    async function setItemDetails(): Promise<void> {
      const details: IBeerDetails[] = await queryItem(Number(index));
      setItemData(details);
    }
    setItemDetails();
  }, [index]);

  return (
    <div className={classes.wrapper}>
      <div>Description: {itemData[0].description}</div>
      <div>Brewed first: {itemData[0].first_brewed}</div>
    </div>
  );
};

export default ItemDetails;

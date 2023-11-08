import { NavLink } from 'react-router-dom';
import classes from './Item.module.css';
import { IBeerDetails } from '../../shared/data/data';

const Item = function (props: {
  setRightSectionState: () => void;
  beer: IBeerDetails;
  searchText: string;
  pageNumber: number;
  sectionOpen: boolean;
  id: number;
}) {
  function getURL(): string {
    let url = '/page/' + props.pageNumber;

    if (props.searchText) {
      url += '/search/' + props.searchText;
    }

    if (!props.sectionOpen) {
      url += '/details/' + Number(props.id);
    }

    return url;
  }

  return (
    <NavLink to={getURL()} key={props.id}>
      <div
        className={classes.flexContainer}
        key={props.id}
        onClick={props.setRightSectionState}
      >
        <div className={classes.imageContainer}>
          <img
            className={classes.itemImage}
            key={props.id}
            src={props.beer.image_url}
            alt={props.beer.name}
          />
        </div>
        <div className={classes.dataContainer}>
          <div>{props.beer.name}</div>
          <div>{props.beer.tagline}</div>
          <div>Volume: {props.beer.abv}%</div>
        </div>
      </div>
    </NavLink>
  );
};

export default Item;

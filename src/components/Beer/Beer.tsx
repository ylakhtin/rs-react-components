import React from 'react';
import {
  ROOT_ENDPOINT,
  INITIAL_ENDPOINT,
  EMPTY_ITEMS_ARRAY,
  BEER_NAME,
} from './data';
import { IBeerDetails } from './data';

class Beer extends React.PureComponent<
  { searchString: string | null },
  { beerList: IBeerDetails[] }
> {
  constructor(
    props:
      | { searchString: string | null }
      | Readonly<{ searchString: string | null }>
  ) {
    super(props);

    this.state = {
      beerList: EMPTY_ITEMS_ARRAY,
    };
  }

  async componentDidMount(): Promise<void> {
    let queryString: string;
    if (this.props.searchString) {
      queryString =
        ROOT_ENDPOINT + INITIAL_ENDPOINT + BEER_NAME + this.props.searchString;
    } else {
      queryString = ROOT_ENDPOINT + INITIAL_ENDPOINT;
    }

    let responseJSON: IBeerDetails[] | Error;

    try {
      const responsePromise = await fetch(queryString, {
        method: 'GET',
      });
      responseJSON = await responsePromise.json();
      if (Array.isArray(responseJSON)) {
        this.setState({ beerList: responseJSON });
      }
    } catch (error) {
      responseJSON = new Error(
        'Cannot reach out to server. Please, check your network connection and server availability.'
      );
    }
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.beerList.map((beer, index) => (
          <div className="flex-container" key={index}>
            <div className="image-container">
              <img
                className="item-image"
                key={index}
                src={beer.image_url}
                alt={beer.name}
              />
            </div>
            <div className="data-container">
              <div>{beer.name}</div>
              <div>{beer.tagline}</div>
              <div>Volume: {beer.abv}%</div>
              <div>{beer.description}</div>
              <div>First brewed: {beer.first_brewed}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Beer;

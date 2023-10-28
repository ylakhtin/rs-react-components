import React from 'react';
import {
  ROOT_ENDPOINT,
  INITIAL_ENDPOINT,
  EMPTY_ITEMS_ARRAY,
  BEER_NAME,
} from './data';
import { IBeerDetails } from './data';

type PropsType = { searchString: string | null };

class Beer extends React.PureComponent<
  PropsType,
  { beerList: IBeerDetails[] }
> {
  constructor(props: PropsType) {
    super(props);

    this.state = {
      beerList: EMPTY_ITEMS_ARRAY,
    };

    this.queryData = this.queryData.bind(this);
  }

  componentDidMount(): void {
    this.queryData();
  }

  async queryData(): Promise<void> {
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

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.searchString !== prevProps.searchString) {
      this.queryData();
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

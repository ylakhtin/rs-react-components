import React from 'react';
import { ROOT_ENDPOINT, INITIAL_ENDPOINT, EMPTY_ITEMS_ARRAY } from './data';
import { IBeerDetails } from './data';

class Beer extends React.Component<number, { beerList: IBeerDetails[] }> {
  constructor(x: number = 0) {
    super(x);

    this.state = {
      beerList: EMPTY_ITEMS_ARRAY,
    };

    this.setInitialItemList = this.setInitialItemList.bind(this);
  }

  async setInitialItemList(): Promise<void> {
    const queryString: string = ROOT_ENDPOINT + INITIAL_ENDPOINT;
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
        <div>{this.state.beerList[0].id}</div>
        <div>{this.state.beerList[0].name}</div>
        <button onClick={this.setInitialItemList}>Init</button>
      </div>
    );
  }
}

export default Beer;

import React from 'react';
import { ROOT_ENDPOINT, INITIAL_ENDPOINT } from './data';
import { IBeerDetails } from './data';

class Beer extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     beerList = this.getInitialItemList();
  //   }
  // }

  async getInitialItemList(): Promise<IBeerDetails | Error> {
    const queryString: string = ROOT_ENDPOINT + INITIAL_ENDPOINT;
    let responseJSON: IBeerDetails | Error;

    try {
      const responsePromise = await fetch(queryString, {
        method: 'GET',
      });
      responseJSON = await responsePromise.json();
    } catch (error) {
      responseJSON = new Error(
        'Cannot reach out to server. Please, check your network connection and server availability.'
      );
    }
    return responseJSON;
  }

  render(): React.ReactNode {
    return <div></div>;
  }
}

export default Beer;

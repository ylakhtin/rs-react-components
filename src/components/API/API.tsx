import { ROOT_ENDPOINT, INITIAL_ENDPOINT, BEER_NAME } from '../ItemList/data';
import { IBeerDetails } from '../ItemList/data';

class API {
  async queryItems(
    searchString: string | null,
    callback: (newState: { beerList: IBeerDetails[] }) => void
  ) {
    let queryString: string;

    if (searchString) {
      queryString = ROOT_ENDPOINT + INITIAL_ENDPOINT + BEER_NAME + searchString;
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
        callback({ beerList: responseJSON });
      }
    } catch (error) {
      responseJSON = new Error(
        'Cannot reach out to server. Please, check your network connection and server availability.'
      );
    }
  }
}

export default API;

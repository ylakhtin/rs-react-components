import { ROOT_ENDPOINT, INITIAL_ENDPOINT, BEER_NAME } from '../ItemList/data';
import { IBeerDetails } from '../ItemList/data';

class API {
  public async queryItems(
    searchString: string | null,
    callback: (newState: { beerList: IBeerDetails[] }) => void
  ): Promise<boolean> {
    let queryString: string;
    let requestOK: boolean;

    if (searchString) {
      queryString =
        ROOT_ENDPOINT + INITIAL_ENDPOINT + BEER_NAME + searchString.trim();
    } else {
      queryString = ROOT_ENDPOINT + INITIAL_ENDPOINT;
    }

    let responseJSON: IBeerDetails[] | Error;

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

    if (Array.isArray(responseJSON)) {
      callback({ beerList: responseJSON });
      requestOK = true;
    } else {
      requestOK = false;
    }

    return requestOK;
  }
}

export default API;

import { ROOT_ENDPOINT, INITIAL_ENDPOINT, BEER_NAME } from '../ItemList/data';
import { IBeerDetails } from '../ItemList/data';

async function queryItems(
  searchString: string | null
): Promise<[boolean, IBeerDetails[] | Error]> {
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
    requestOK = true;
  } else {
    requestOK = false;
  }
  return [requestOK, responseJSON];
}

export default queryItems;

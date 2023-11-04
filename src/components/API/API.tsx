import {
  ROOT_ENDPOINT,
  BEERS,
  PAGE_NUMBER,
  PER_PAGE,
  BEER_NAME,
  SINGLE_BEER,
} from './data';
import { IBeerDetails } from '../ItemList/data';

function buildQueryString(
  searchString: string | null,
  pageNumber: number,
  perPage: number
): string {
  let queryString: string;

  if (searchString) {
    queryString =
      ROOT_ENDPOINT +
      BEERS +
      PAGE_NUMBER +
      pageNumber +
      PER_PAGE +
      perPage +
      BEER_NAME +
      searchString.trim();
  } else {
    queryString =
      ROOT_ENDPOINT + BEERS + PAGE_NUMBER + pageNumber + PER_PAGE + perPage;
  }

  return queryString;
}

async function sendGetQuery(
  queryString: string
): Promise<IBeerDetails[] | Error> {
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

  return responseJSON;
}

async function queryItems(
  searchString: string | null,
  pageNumber: number = 1,
  perPage: number = 4
): Promise<[boolean, IBeerDetails[] | Error]> {
  const queryString = buildQueryString(searchString, pageNumber, perPage);
  let requestOK: boolean;
  const responseJSON: IBeerDetails[] | Error = await sendGetQuery(queryString);

  if (Array.isArray(responseJSON)) {
    requestOK = true;
  } else {
    requestOK = false;
  }
  return [requestOK, responseJSON];
}

async function queryItem(id: number): Promise<IBeerDetails[]> {
  const queryString = SINGLE_BEER + id;
  const responseJSON: IBeerDetails[] | Error = await sendGetQuery(queryString);

  if (Array.isArray(responseJSON)) {
    return responseJSON;
  } else {
    return [];
  }
}

export { queryItems, queryItem };

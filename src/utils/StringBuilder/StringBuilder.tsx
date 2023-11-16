import {
  ROOT_ENDPOINT,
  BEERS,
  PAGE_NUMBER,
  PER_PAGE,
  BEER_NAME,
} from '../../shared/data/data';

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

export { buildQueryString };

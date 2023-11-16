import {
  BEERS,
  BEER_NAME,
  PAGE_NUMBER,
  PER_PAGE,
  ROOT_ENDPOINT,
} from '../../../shared/data/data';
import { buildQueryString } from '../API';

describe('API tests', () => {
  it('Tests query string build', () => {
    const testSearchString = 'Buzz';
    const testPageNumber = 1;
    const testPerPage = 4;
    const expectedQueryStringWithSearch =
      ROOT_ENDPOINT +
      BEERS +
      PAGE_NUMBER +
      testPageNumber +
      PER_PAGE +
      testPerPage +
      BEER_NAME +
      testSearchString.trim();

    const expectedQueryStringNoSearch =
      ROOT_ENDPOINT +
      BEERS +
      PAGE_NUMBER +
      testPageNumber +
      PER_PAGE +
      testPerPage;

    const queryStringWithSearch = buildQueryString(
      testSearchString,
      testPageNumber,
      testPerPage
    );

    const queryStringNoSearch = buildQueryString(
      '',
      testPageNumber,
      testPerPage
    );

    expect(queryStringWithSearch).toEqual(expectedQueryStringWithSearch);
    expect(queryStringNoSearch).toEqual(expectedQueryStringNoSearch);
  });
});

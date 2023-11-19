import { http, HttpResponse } from 'msw';
import {
  beerDetails,
  firstPage,
  firstPageTen,
  secondPage,
  thirdPage,
} from '../../shared/data/testData';
import { IBeerDetails } from '../../shared/data/data';

const mainPath = 'https://api.punkapi.com/v2';

export const handlers = [
  http.get(`${mainPath}/beers?page=1&per_page=4&beer_name=Buzz`, () => {
    const array: IBeerDetails[] = [];
    array.push(beerDetails);
    return HttpResponse.json({ array });
  }),

  http.get(`${mainPath}/beers?page=1&per_page=4`, () => {
    return HttpResponse.json({ firstPage });
  }),

  http.get(`${mainPath}/beers`, () => {
    return HttpResponse.json({ firstPage });
  }),

  http.get(`${mainPath}/beers/1`, () => {
    return HttpResponse.json({ firstPage });
  }),

  http.get(`${mainPath}/beers?page=1&per_page=4`, () => {
    return HttpResponse.json({ firstPage });
  }),

  http.get(`${mainPath}/beers?page=1&per_page=10`, () => {
    return HttpResponse.json({ firstPageTen });
  }),

  http.get(`${mainPath}/beers?page=2&per_page=4`, () => {
    return HttpResponse.json({ secondPage });
  }),

  http.get(`${mainPath}/beers?page=3&per_page=4`, () => {
    return HttpResponse.json({ thirdPage });
  }),
];

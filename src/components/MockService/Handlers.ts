import { http, HttpResponse } from 'msw';
import {
  beerDetails,
  firstPage,
  firstPageTen,
  secondPage,
  thirdPage,
} from '../../shared/data/testData';
import { IBeerDetails, ROOT_ENDPOINT } from '../../shared/data/data';

export const handlers = [
  http.get(`${ROOT_ENDPOINT}/beers?page=1&per_page=4&beer_name=Buzz`, () => {
    const array: IBeerDetails[] = [];
    array.push(beerDetails);
    return HttpResponse.json({ array });
  }),

  http.get(`${ROOT_ENDPOINT}/beers?page=1&per_page=4`, () => {
    return HttpResponse.json({ firstPage });
  }),

  http.get(`${ROOT_ENDPOINT}/beers/1`, () => {
    return HttpResponse.json({ firstPage });
  }),

  http.get(`${ROOT_ENDPOINT}/beers?page=1&per_page=4`, () => {
    return HttpResponse.json({ firstPage });
  }),

  http.get(`${ROOT_ENDPOINT}/beers?page=1&per_page=10`, () => {
    return HttpResponse.json({ firstPageTen });
  }),

  http.get(`${ROOT_ENDPOINT}/beers?page=2&per_page=4`, () => {
    return HttpResponse.json({ secondPage });
  }),

  http.get(`${ROOT_ENDPOINT}/beers?page=3&per_page=4`, () => {
    return HttpResponse.json({ thirdPage });
  }),
];

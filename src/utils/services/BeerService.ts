import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IBeerDetails, ROOT_ENDPOINT } from '../../shared/data/data';

export const beerAPI = createApi({
  reducerPath: 'beerAPI',
  baseQuery: fetchBaseQuery({ baseUrl: ROOT_ENDPOINT }),
  endpoints: (build) => ({
    fetchData: build.query<IBeerDetails[], string>({
      query: (queryString: string) => ({
        url: `${queryString}`,
      }),
    }),
  }),
});

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSliceReducer from './Reducers/SearchReducer';
import itemListReducer from './Reducers/ItemListReducer';
import perPageReducer from './Reducers/PerPageReducer';
import itemDetailsReducer from './Reducers/ItemDetailsReducer';
import listLoadingReducer from './Reducers/ListLoadReducer';
import itemLoadingReducer from './Reducers/ItemDetailLoadReducer';
import { beerAPI } from '../services/BeerService';

const rootReducer = combineReducers({
  searchSliceReducer, // active search string
  itemListReducer, // all items on the page
  perPageReducer, // amount of items per page
  itemDetailsReducer, // item details section state open/closed
  listLoadingReducer, // item list loading state
  itemLoadingReducer, // item details loading state
  [beerAPI.reducerPath]: beerAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(beerAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

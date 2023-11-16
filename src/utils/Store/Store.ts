import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSliceReducer from './Reducers/SearchReducer';
import itemListReducer from './Reducers/ItemListReducer';
import perPageReducer from './Reducers/PerPageReducer';
import itemDetailsReducer from './Reducers/ItemDetailsReducer';
import { beerAPI } from '../services/BeerService';

const rootReducer = combineReducers({
  searchSliceReducer,
  itemListReducer,
  perPageReducer,
  itemDetailsReducer,
  [beerAPI.reducerPath]: beerAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(beerAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

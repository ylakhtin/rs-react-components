import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchSliceReducer from './Reducers/SearchReducer';
import itemListReducer from './Reducers/ItemListReducer';
import perPageReducer from './Reducers/PerPageReducer';

const rootReducer = combineReducers({
  searchSliceReducer,
  itemListReducer,
  perPageReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

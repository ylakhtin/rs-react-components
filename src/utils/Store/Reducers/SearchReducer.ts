import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SEARCH_DEFAULT } from '../../../shared/data/data';

interface ISearchString {
  searchRootString: string;
}

const initialState: ISearchString = {
  searchRootString: localStorage.getItem(SEARCH_DEFAULT) || '',
};

export const searchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    setRootSearch(state, action: PayloadAction<string>) {
      state.searchRootString = action.payload;
    },
  },
});

export default searchSlice.reducer;

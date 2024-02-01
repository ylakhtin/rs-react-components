import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBeerDetails } from '../../../shared/data/data';

interface IList {
  beerList: IBeerDetails[];
}

const initialState: IList = {
  beerList: [],
};

export const itemListSlice = createSlice({
  name: 'ItemList',
  initialState,
  reducers: {
    setItemList(state: IList, action: PayloadAction<IBeerDetails[]>) {
      state.beerList = action.payload;
    },
  },
});

export default itemListSlice.reducer;

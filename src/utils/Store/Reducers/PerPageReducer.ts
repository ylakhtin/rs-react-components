import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_ITEMS_PER_PAGE } from '../../../shared/data/data';

interface IPerPage {
  perPage: number;
}

const initialState: IPerPage = {
  perPage: DEFAULT_ITEMS_PER_PAGE,
};

export const perPageSlice = createSlice({
  name: 'PerPage',
  initialState,
  reducers: {
    setPerPage(state: IPerPage, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
  },
});

export default perPageSlice.reducer;

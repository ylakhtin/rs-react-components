import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IdetailsState {
  sectionOpen: boolean;
}

const initialState: IdetailsState = {
  sectionOpen: false,
};

export const detailsOpenSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    setDetailsOpen(state, action: PayloadAction<boolean>) {
      state.sectionOpen = action.payload;
    },
  },
});

export default detailsOpenSlice.reducer;

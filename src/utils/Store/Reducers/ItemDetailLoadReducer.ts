import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IItemLoading {
  itemIsLoading: boolean;
}

const initialState: IItemLoading = {
  itemIsLoading: false,
};

export const itemLoadingSlice = createSlice({
  name: 'ItemLoading',
  initialState,
  reducers: {
    setItemLoading(state: IItemLoading, action: PayloadAction<boolean>) {
      state.itemIsLoading = action.payload;
    },
  },
});

export default itemLoadingSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IListLoading {
  listIsLoading: boolean;
}

const initialState: IListLoading = {
  listIsLoading: false,
};

export const listLoadingSlice = createSlice({
  name: 'ListLoading',
  initialState,
  reducers: {
    setListLoading(state: IListLoading, action: PayloadAction<boolean>) {
      state.listIsLoading = action.payload;
    },
  },
});

export default listLoadingSlice.reducer;

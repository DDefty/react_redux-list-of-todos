import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  query: string;
  status: Status;
}

const initialState: State = {
  query: '',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
      SET_STATUS: (s, a: PayloadAction<{status: Status}>) => {
        s.status = a.payload.status
      },
      SET_QUERY: (s, a: PayloadAction<{query: string}>) => {
        s.query = a.payload.query
      },
    },
});

export const { SET_STATUS, SET_QUERY } = filterSlice.actions;
export default filterSlice.reducer;

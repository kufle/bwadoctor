import {createSlice} from '@reduxjs/toolkit';

const inititalStateAccount = {
  loading: false,
  name: 'John Cena',
  address: 'Jl. Kemana no.99',
};

const accountSlice = createSlice({
  name: 'account',
  initialState: inititalStateAccount,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {setLoading} = accountSlice.actions;

export default accountSlice.reducer;

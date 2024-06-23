import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minDate: null,
  maxDate: null,
};
const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setMinDate(state, action) {
      state.minDate = Math.min(...action.payload.map((item) => item.date));
    },
    setMaxDate(state, action) {
      state.maxDate = Math.max(...action.payload.map((item) => item.date));
    },
  },
});

export const { setMinDate, setMaxDate } = dateSlice.actions;

export default dateSlice.reducer;

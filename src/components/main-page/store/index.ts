import { configureStore } from "@reduxjs/toolkit";
import switchSlice from "./switchSlice";
import dateSlice from "./dateSlice";

const store = configureStore({
  reducer: {
    switch: switchSlice,
    date: dateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

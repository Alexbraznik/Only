import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISlidersData, allFacts, circlesData } from "../constants";

interface ISwitchState {
  selectedCategory: ISlidersData[];
  currentParentId: number;
}

const initialState: ISwitchState = {
  selectedCategory: allFacts.filter((fact) => fact.parentId === 1),
  currentParentId: 6,
};

const switchSlice = createSlice({
  name: "switch",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<number>) {
      let newParentId =
        ((state.currentParentId + action.payload - 1 + circlesData.length) %
          circlesData.length) +
        1;
      state.currentParentId = newParentId;
      state.selectedCategory = allFacts.filter(
        (fact) => fact.parentId === newParentId
      );
    },
    setCurrentParentId(state, action: PayloadAction<number>) {
      state.currentParentId = action.payload;
      state.selectedCategory = allFacts.filter(
        (fact) => fact.parentId === action.payload
      );
    },
  },
});

export const { setSelectedCategory, setCurrentParentId } = switchSlice.actions;

export default switchSlice.reducer;

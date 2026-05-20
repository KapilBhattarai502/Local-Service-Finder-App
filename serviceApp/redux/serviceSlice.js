import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    selectedServices: [],
  },
  reducers: {
    addService: (state, action) => {
      if (!state.selectedServices.includes(action.payload)) {
        state.selectedServices.push(action.payload);
      }
    },
    removeService: (state, action) => {
      state.selectedServices = state.selectedServices.filter(
        (item) => item !== action.payload
      );
    },
    clearServices: (state) => {
      state.selectedServices = [];
    },
  },
});

export const { addService, removeService, clearServices } =
  serviceSlice.actions;
export default serviceSlice.reducer;

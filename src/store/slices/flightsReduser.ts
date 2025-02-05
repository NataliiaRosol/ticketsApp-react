import { createSlice } from "@reduxjs/toolkit";

// Get selected flight
const initialState = {
  flights: [],
  selectedFlightId: null,
};

const flightsReducer = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    selectFlight: (state, action) => {
      state.selectedFlightId = action.payload;
    },
  },
});

export const { setFlights, selectFlight } = flightsReducer.actions;
export default flightsReducer.reducer;
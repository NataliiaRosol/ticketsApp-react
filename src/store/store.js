import { configureStore } from "@reduxjs/toolkit";
import flightsReduser from "./slices/flightsReduser";

const store = configureStore({
  reducer: {
    flights: flightsReduser,
    // cart: cartReducer,
  },
});

export default store;
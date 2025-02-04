import { configureStore } from "@reduxjs/toolkit";
import flightsReduser from "./slices/flightsReduser";

const store = configureStore({
  reducer: {
    flights: flightsReduser,
    // cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
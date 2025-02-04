import { configureStore } from "@reduxjs/toolkit";
import flightsReduser from "./slices/flightsReduser";
import ticketsReducer from "./slices/ticketsReducer";

const store = configureStore({
  reducer: {
    flights: flightsReduser,
    tickets: ticketsReducer,
    // cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
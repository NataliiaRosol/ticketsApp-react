import { configureStore, Middleware } from "@reduxjs/toolkit";
import flightsReduser from "./slices/flightsReduser";
import ticketsReducer from "./slices/ticketsReducer";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action); // Викликаємо наступний middleware / редуктор

  // Отримуємо оновлений стан
  const state = store.getState();

  // Зберігаємо вибрані квитки у localStorage
  localStorage.setItem("cart", JSON.stringify(state.tickets.selectedTickets));

  return result;
};

const store = configureStore({
  reducer: {
    flights: flightsReduser,
    tickets: ticketsReducer,
  },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
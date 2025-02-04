import { createSlice } from "@reduxjs/toolkit";

interface TicketsState {
  selectedSeats: string[];
}

const initialState:TicketsState = {
  selectedSeats: [],
}

const ticketsReducer = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      state.selectedSeats.push(action.payload);
    },
    removeTicket: (state, action) => {
      state.selectedSeats = state.selectedSeats.filter(id => id !== action.payload);
    },
  },
});

export const { addTicket, removeTicket } = ticketsReducer.actions;
export default ticketsReducer.reducer;
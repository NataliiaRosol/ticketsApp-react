import { createSlice } from "@reduxjs/toolkit";

import { Seat, Ticket } from './../../utils/types'


// Тип для сітки місць
type SeatsGrid = Seat[][];


// Структура збереження у Redux
interface TicketsState {
  seats: SeatsGrid;
  selectedTickets: Ticket[];
}

const generateSeats = (rows: number, cols: number): SeatsGrid => {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      id: `${rowIndex}${colIndex}`,
      occupied: Math.random() < 0.3, // 30% шанс зайнятого місця
    }))
  );
};

const initialState:TicketsState = {
  seats: generateSeats(10, 6),
  selectedTickets: [],
}

const ticketsReducer = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      const { flight, seat } = action.payload;

      // Перевіряємо, чи цей квиток вже є у списку
      const alreadySelected = state.selectedTickets.some(
        (t) => t.seat.id === seat.id && t.flight.id === flight.id
      );

      if (!alreadySelected) {
        state.selectedTickets.push(action.payload);
      }
    },
    removeTicket: (state, action) => {
      state.selectedTickets = state.selectedTickets.filter(
        (ticket) => !(ticket.seat.id === action.payload.seatId && ticket.flight.id === action.payload.flightId)
      );
    },
  },
});

export const { addTicket, removeTicket } = ticketsReducer.actions;
export default ticketsReducer.reducer;
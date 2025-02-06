import { createSlice } from "@reduxjs/toolkit";

import { Seat, Ticket } from "./../../utils/types";

// For adding and removing tickets from cart

// Type for seat grid
type SeatsGrid = Seat[][];

// Data structura in Redux
interface TicketsState {
  seats: SeatsGrid;
  selectedTickets: Ticket[];
}

const initialState: TicketsState = {
  seats: generateSeats(10, 6),
  selectedTickets: loadTicketsFromLocalStorage(),
};

function generateSeats(rows: number, cols: number): SeatsGrid {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      id: `${rowIndex}${colIndex}`,
      occupied: Math.random() < 0.3, // 30% occupated seat chance
    }))
  );
}

function loadTicketsFromLocalStorage() {
  try {
    const savedTickets = localStorage.getItem("cart");
    return savedTickets ? JSON.parse(savedTickets) : [];
  } catch (error) {
    console.error("Помилка завантаження квитків з localStorage:", error);
    return [];
  }
}

const ticketsReducer = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      const { flight, seat } = action.payload;

      // Check this ticket already in a cart
      const alreadySelected = state.selectedTickets.some(
        (t) => t.seat.id === seat.id && t.flight.id === flight.id
      );

      if (!alreadySelected) {
        state.selectedTickets.push(action.payload);
      }
    },
    removeTicket: (state, action) => {
      state.selectedTickets = state.selectedTickets.filter(
        (ticket) =>
          !(
            ticket.seat.id === action.payload.seatId &&
            ticket.flight.id === action.payload.flightId
          )
      );
    },
  },
});

export const { addTicket, removeTicket } = ticketsReducer.actions;
export default ticketsReducer.reducer;

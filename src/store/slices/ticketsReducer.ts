import { createSlice } from "@reduxjs/toolkit";

// Тип для місця
interface Seat {
  id: string;
  occupied: boolean;
}

// Тип для сітки місць
type SeatsGrid = Seat[][];



interface TicketsState {
  seats: SeatsGrid;
  selectedSeats: string[];
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
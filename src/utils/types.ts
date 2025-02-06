// Flifht type
export interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  terminal: string;
  gate: string;
  tickets: {
    total: number;
    remaining: number;
  };
}

// Seat type
export interface Seat {
  id: string;
  occupied: boolean;
}

// Ticket type
export interface Ticket {
  flight: Flight;
  seat: Seat;
}


// Тип для рейсу
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

//Тип для місця
export interface Seat {
  id: string;
  occupied: boolean;
}

// Тип для квитка
export interface Ticket {
  flight: Flight;
  seat: Seat;
}

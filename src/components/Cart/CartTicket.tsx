import styles from './FlightTicket.module.css'

interface Flight {
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

interface CartTicketProps {
  flight: Flight;
  selectedSeat?: string | null;
}

const CartTicket: React.FC<CartTicketProps> = ({ flight, selectedSeat }) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.ticketSidebar}>
        <span className={styles.ticketAirline}>{flight.airline}</span>
      </div>
      <div className={styles.ticketBody}>
        <div className={styles.ticketHeader}>
          <span className={styles.ticketRoute}>{flight.from} ✈ {flight.to}</span>
        </div>
        <div className={styles.ticketInfo}>
          <p>Departure: <strong>{new Date(flight.departureTime).toLocaleTimeString()}</strong></p>
          <p>Arrival: <strong>{new Date(flight.arrivalTime).toLocaleTimeString()}</strong></p>
          <p>Terminal: <strong>{flight.terminal}</strong></p>
          <p>Gate: <strong>{flight.gate}</strong></p>
          {selectedSeat && <p>Selected Seat: <strong>{selectedSeat}</strong></p>}
        </div>
        <div className={styles.ticketFooter}>
          <p>Tickets remaining: <strong>{flight.tickets.remaining}/{flight.tickets.total}</strong></p>
          <p className={styles.ticketPrice}>${flight.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTicket;
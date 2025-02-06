import { useDispatch } from 'react-redux';
import styles from './CartTicket.module.css'
import { MdDeleteSweep } from "react-icons/md";
import { removeTicket } from '../../store/slices/ticketsReducer';

import { Flight } from './../../utils/types'

interface CartTicketProps {
  flight: Flight;
  selectedSeat?: string | null;
}

const CartTicket: React.FC<CartTicketProps> = ({ flight, selectedSeat }) => {
  const dispatch = useDispatch();

  // Handle ticket removing
  const handleRemoveTicket = () => {
    if (selectedSeat) {
      dispatch(removeTicket({ flightId: flight.id, seatId: selectedSeat }));
    }
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.ticketSidebar}>
        <span className={styles.ticketAirline}>{flight.airline}</span>
      </div>
      <div className={styles.ticketBody}>
        <div className={styles.ticketHeader}>
          <span className={styles.ticketRoute}>{flight.from} ✈ {flight.to}</span>
          <MdDeleteSweep style={{ width: "25px", height: "25px" }} onClick={handleRemoveTicket} />          
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
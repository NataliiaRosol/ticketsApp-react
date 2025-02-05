// import styles from '../Cart/FlightTicket.module.css'

import { Flight } from './../../utils/types'


const FlightTicket: React.FC<{ flight: Flight }> = ({ flight }) => {
  return (
    <div className="ticket">
      <div className="ticket-header">{flight.airline}</div>
      <div className="ticket-body">
        <div className="ticket-route">
          <span>{flight.from}</span> ✈ <span>{flight.to}</span>
        </div>
        <div className="ticket-info">
          <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
          <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
          <p>Terminal: {flight.terminal}</p>
          <p>Gate: {flight.gate}</p>
        </div>
        <div className="ticket-footer">
          <p>Tickets remaining: {flight.tickets.remaining} / {flight.tickets.total}</p>
          <div className="price">${flight.price}</div>
        </div>
      </div>
    </div>
  );
};

export default FlightTicket;

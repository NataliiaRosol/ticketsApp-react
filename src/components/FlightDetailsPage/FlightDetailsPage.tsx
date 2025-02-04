import { useParams } from "react-router";
import Header from "../header/Header";
import { useEffect, useState } from "react";

import { TbArmchair } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, removeTicket } from "../../store/slices/ticketsReducer";
import { RootState } from "../../store/store";
import axios from "axios";

// Тип для місця
interface Seat {
  id: string;
  occupied: boolean;
}

// Тип для сітки місць
type SeatsGrid = Seat[][];

interface Flight {
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

const generateSeats = (rows: number, cols: number): SeatsGrid => {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      id: `${rowIndex}${colIndex}`,
      occupied: Math.random() < 0.3, // 30% шанс зайнятого місця
    }))
  );
};

function FlightDetailsPage() {
  const [seats, setSeats] = useState<SeatsGrid>(generateSeats(10, 6));
  const [flight, setFlight] = useState<Flight | null>(null);
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const selectedSeats = useSelector(
    (state: RootState) => state.tickets.selectedSeats
  );

  const handleSelectSeat = (rowIndex: number, colIndex: number): void => {
    const seat = seats[rowIndex][colIndex];
    if (seat.occupied) return;

    if (selectedSeats.includes(seat.id)) {
      dispatch(removeTicket(seat.id));
    } else {
      dispatch(addTicket(seat.id));
    }
  };

  const fetchFlightDetails = async (): Promise<void> => {
    const res = await axios.get<Flight>(
      `https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights/${id}`
    );
    const data = res.data;
    setFlight(data);
  };

  useEffect(() => {
    fetchFlightDetails();
  }, []);

  console.log(flight);

  return (
    <>
      <Header />
      <main className="main">
        <div className="seats">
          <div className="seats-inner">
            <h2 className="seats-header">Select seats:</h2>
            <div className="seats-notes">
              <p>🟥 - Місце зайняте</p>
              <p>🟩 - Місце вільне</p>
              <p>🟨 - Вибране місце</p>
            </div>
            {seats.map((row, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {row.map((seat, colIndex) => (
                  <div
                    key={seat.id}
                    className={`seat ${
                      seat.occupied
                        ? "occupied"
                        : selectedSeats.includes(seat.id)
                        ? "selected"
                        : "free"
                    }`}
                    onClick={() => handleSelectSeat(rowIndex, colIndex)}
                  >
                    <TbArmchair />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {flight && (
            <div className="flight-info">
              <h3 className="flight-info-header">
                {flight.from} → {flight.to}
              </h3>
              <p>Airline: {flight.airline}</p>
              <p>Departure time: {flight.departureTime}</p>
              <p>Arrival time: {flight.arrivalTime}</p>
              <p>Terminal: {flight.terminal}</p>
              <p>Gate: {flight.gate}</p>
              <p className="flight-info-tickets">
                Total tickets: {flight.tickets?.total}
              </p>
              <p>Remaining: {flight.tickets?.remaining}</p>
              <p className="flight-info-price">
                Price per ticket: <span>{flight.price}$</span>{" "}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default FlightDetailsPage;

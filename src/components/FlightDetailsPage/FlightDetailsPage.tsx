import { useParams } from "react-router";
import Header from "../header/Header";
import { useEffect, useState } from "react";

import { TbArmchair } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { addTicket, removeTicket } from "../../store/slices/ticketsReducer";
import { RootState } from "../../store/store";
import axios from "axios";
import FlightDetailsLoading from "./loading/FlightDetailsLoading";
import FlightDetailsError from "./error/FlightDetailsError";

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

function FlightDetailsPage() {
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const seats = useSelector((state: RootState) => state.tickets.seats);
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
    try {
      setError(false);
      setLoading(true);
      const res = await axios.get<Flight>(
        `https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights/${id}`
      );
      const data = res.data;
      setFlight(data);
    } catch (error) {
      setLoading(true);
      console.error("Помилка завантаження рейсів:", error);
      setError(true);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlightDetails();
  }, []);

  console.log(flight);

  return (
    <>
      <Header />
      <main className="main">
        {loading && <FlightDetailsLoading />}
        {error && (
          <FlightDetailsError
            errorMessage={errorMessage}
            onRetry={fetchFlightDetails}
          />
        )}
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

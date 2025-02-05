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
import FlightTicket from "./FlightTicket";

import { Flight, Ticket } from './../../utils/types'


function FlightDetailsPage() {
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const seats = useSelector((state: RootState) => state.tickets.seats);
  const selectedTickets = useSelector(
    (state: RootState) => state.tickets.selectedTickets
  );

  const handleSelectSeat = (rowIndex: number, colIndex: number): void => {
    if (!flight) return; // Якщо ще немає даних про рейс, не даємо обрати місце

    const seat = seats[rowIndex][colIndex];
    if (seat.occupied) return;

    const ticket: Ticket = { flight, seat };

    // Перевіряємо, чи це місце для цього рейсу вже вибране
    const alreadySelected = selectedTickets.some(
      (t) => t.seat.id === seat.id && t.flight.id === flight.id
    );

    if (alreadySelected) {
      dispatch(removeTicket({ flightId: flight.id, seatId: seat.id }));
    } else {
      dispatch(addTicket(ticket));
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
    <div className="background">
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
                {row.map((seat, colIndex) => {
                  const isSelected = selectedTickets.some(
                    (t) => t.seat.id === seat.id && t.flight.id === flight?.id
                  );

                  return (
                    <div
                      key={seat.id}
                      className={`seat ${
                        seat.occupied
                          ? "occupied"
                          : isSelected
                          ? "selected"
                          : "free"
                      }`}
                      onClick={() => handleSelectSeat(rowIndex, colIndex)}
                    >
                      <TbArmchair />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {flight && <FlightTicket flight={flight} />}
        </div>
      </main>
    </div>
  );
}

export default FlightDetailsPage;

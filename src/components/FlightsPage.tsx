import '../index.css'

import axios from "axios";
import React, { useEffect, useState } from "react";
import FlightsPageLoading from "./loading/flightsPage/FlightsPageLoading";
import FlightsPageError from "./errors/flightsPage/FlightsPageError";
import FlightCard from "./FlightCard";

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

const FlightsPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Get all flights
  async function fetchFlights() {
    try {
      setError(false);
      setLoading(true);
      const res = axios.get<Flight[]>(
        "https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights"
      );
      const data = (await res).data;
      setFlights(data);
    } catch (error) {
      setLoading(true);
      console.error("Помилка завантаження рейсів:", error);
      setError(true);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFlights();
  }, []);

  console.log(flights);

  return (
    <>
      <main className='main'>
        <h1 className="header">Flights App</h1>

        {loading && <FlightsPageLoading />}
        {error && <FlightsPageError errorMessage={errorMessage} onRetry={fetchFlights} />}

        {flights &&
          flights.length > 0 &&
          flights.map((flight) => (
            <FlightCard key={flight.id} id={flight.id} />
          ))}
      </main>
    </>
  );
}

export default FlightsPage;

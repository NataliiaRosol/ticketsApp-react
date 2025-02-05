import "../../index.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FlightsPageLoading from "./loading/FlightsPageLoading.tsx";
import FlightsPageError from "./error/FlightsPageError.tsx";
import FlightCard from "../FlightCard.tsx";
import Header from "../header/Header.tsx";

import { setFlights } from "../../store/slices/flightsReduser.ts";
import { RootState } from "../../store/store.ts";

import { Flight } from './../../utils/types'

const FlightsPage: React.FC = () => {
  const dispatch = useDispatch();
  const flights = useSelector((state: RootState) => state.flights.flights);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Get all flights
  async function fetchFlights() {
    try {
      setError(false);
      setLoading(true);
      const res = axios.get<Flight[]>(
        "https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights"
      );
      const data = (await res).data;
      dispatch(setFlights(data)); // Оновлюємо Redux Store
    } catch (error) {
      setLoading(true);
      console.error("Помилка завантаження рейсів:", error);
      setError(true);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
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
      <Header />
      <main className="main">
        {loading && <FlightsPageLoading />}
        {error && (
          <FlightsPageError
            errorMessage={errorMessage}
            onRetry={fetchFlights}
          />
        )}

        <div className="flights">
          {flights &&
            flights.length > 0 &&
            flights.map((flight: Flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
      </main>
    </>
  );
};

export default FlightsPage;

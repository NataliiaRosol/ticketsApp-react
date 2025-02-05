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

  const [sortOrder, setSortOrder] = useState<"low-to-high" | "high-to-low" | "not-selected">("not-selected"); // Стан для сортування

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

  // Обробка сортування
  const handlePriceSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "low-to-high") setSortOrder("low-to-high");
    else if (value === "high-to-low") setSortOrder("high-to-low");
    else setSortOrder("not-selected");
  };

  // Фільтрація за ціною
  const sortedFlights: Flight[] = [...flights].sort((a: Flight, b: Flight) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  // console.log(flights);

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

        {/* Випадаючий список сортування */}
        <div className="sorting-container">
          <p className="sorting-label">Price:</p>
          <select onChange={handlePriceSorting} className="sorting-select">
            <option value="not-selected">Not selected</option>
            <option value="low-to-high">Low to high</option>
            <option value="high-to-low">High to low</option>
          </select>
        </div>

        <div className="flights">
          {sortedFlights &&
            sortedFlights.length > 0 &&
            sortedFlights.map((flight: Flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
      </main>
    </>
  );
};

export default FlightsPage;

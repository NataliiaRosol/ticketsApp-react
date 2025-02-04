import { useState } from "react";
import Header from "../header/Header";
import CartLoading from "./loading/CartLoading";
import EmptyCart from "./EmptyCart";
import CartTicket from "./CartTicket";

const flight = {
  airline: "Sky Airlines",
  arrivalTime: "2025-05-01T16:00:00Z",
  departureTime: "2025-05-01T10:00:00Z",
  from: "LAX",
  gate: "C12",
  id: "FL001",
  price: 300,
  terminal: "3",
  tickets: { total: 150, remaining: 75 },
  to: "JFK",
};

function Cart() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <main className="main">
      <Header />

      {loading && <CartLoading />}
      {/* {error && (
          <CartError
            errorMessage={errorMessage}
            onRetry={fetchFlights}
          />
        )} */}

      {/* <EmptyCart /> */}

      <CartTicket flight={flight} selectedSeat={"01"} />
    </main>
  );
}

export default Cart;

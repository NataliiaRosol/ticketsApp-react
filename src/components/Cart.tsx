import { useState } from "react";
import Header from "./header/Header"
import CartLoading from "./Cart/loading/CartLoading";
import EmptyCart from "./Cart/EmptyCart";


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

        <EmptyCart />
        </main>
  )
}

export default Cart
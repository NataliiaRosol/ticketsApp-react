import Header from "../header/Header";
// import CartLoading from "./loading/CartLoading";
import EmptyCart from "./EmptyCart";
import CartTicket from "./CartTicket";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Cart() {
  const selectedTickets = useSelector(
    (state: RootState) => state.tickets.selectedTickets
  );

  // Загальна кількість квитків
  const totalTickets = selectedTickets.length;

  // Сума всіх квитків
  const totalPrice = selectedTickets.reduce((total, { flight }) => {
    return total + flight.price;
  }, 0);

  return (
    <>
      <Header />
      <main className="main">
        {selectedTickets.length === 0 && <EmptyCart />}
        <div className="tickets">
          {selectedTickets.map(({ flight, seat }, index) => (
            <CartTicket key={index} flight={flight} selectedSeat={seat.id} />
          ))}
        </div>

        {selectedTickets.length > 0 && (
          <div className="cart-summary">
            <h2>Your cart summary</h2>
            <p>Total items: {totalTickets}</p>
            <p>Total amount: {totalPrice}$</p>
          </div>
        )}

      </main>
    </>
  );
}

export default Cart;

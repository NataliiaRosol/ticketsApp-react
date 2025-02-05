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
      </main>
    </>
  );
}

export default Cart;

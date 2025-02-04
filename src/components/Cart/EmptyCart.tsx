import { Link } from "react-router";
import { LiaPlaneDepartureSolid } from "react-icons/lia";

function EmptyCart() {
  return (
    <div className="wrapper">
        <p className="">Your cart is empty</p>
      
      <Link to={"/"}>
        <button className="emptyCart-btn">Go Home <LiaPlaneDepartureSolid /></button>
      </Link>
    </div>
  );
}

export default EmptyCart;

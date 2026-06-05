import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Checkout.css";

function Checkout() {
const buyNowProduct = JSON.parse(
  localStorage.getItem("buyNowProduct")
);
  const navigate = useNavigate();

 const { cartItems } = useContext(CartContext);

const checkoutItems =
  buyNowProduct
    ? [buyNowProduct]
    : cartItems;

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const totalAmount = checkoutItems.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
);

  return (
    <div>

      <Navbar />

      <div className="checkout-container">

        <h1>Checkout</h1>

        <div className="checkout-card">

          <h2>Order Summary</h2>

          {checkoutItems.map((item) => (

            <div
              key={item.id}
              className="checkout-item"
            >

              <p>{item.name}</p>

              <p>
                ₹{item.price}
                ×
                {item.quantity}
              </p>

            </div>

          ))}

          <h3>
            Total: ₹{totalAmount}
          </h3>

          <hr />

          <h2>Customer Details</h2>

          <p>
            <strong>Name:</strong>
            {" "}
            {user?.name}
          </p>

          <p>
            <strong>Phone:</strong>
            {" "}
            {user?.phone}
          </p>

          <p>
            <strong>Address:</strong>
            {" "}
            {user?.address}
          </p>

          <button
            className="payment-btn"
            onClick={() =>
              navigate("/payment")
            }
          >
            Proceed To Payment
          </button>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Checkout;
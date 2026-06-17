import { useContext,useState } from "react";
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

  const [isEditingAddress,
  setIsEditingAddress] =
  useState(false);

const [deliveryAddress,
  setDeliveryAddress] =
  useState(
    localStorage.getItem(
      "deliveryAddress"
    ) || user?.address || ""
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
  key={item._id || item.id}
  className="checkout-item"
>

  <p>
    <strong>
      {item.name}
    </strong>
  </p>

  {item.selectedColor && (

    <p>
      Color:
      {" "}
      {item.selectedColor}
    </p>

  )}

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

          <div>

  <p>
    <strong>
      Delivery Address:
    </strong>
  </p>

  {isEditingAddress ? (

    <textarea
      rows="4"
      value={
        deliveryAddress
      }
      onChange={(e) =>
        setDeliveryAddress(
          e.target.value
        )
      }
      style={{
        width: "100%",
        padding: "10px",
        marginTop: "10px",
      }}
    />

  ) : (

    <p>
      {deliveryAddress}
    </p>

  )}

  <button
    type="button"
    onClick={() => {

      if (
        isEditingAddress
      ) {

        localStorage.setItem(
          "deliveryAddress",
          deliveryAddress
        );

      }

      setIsEditingAddress(
        !isEditingAddress
      );

    }}
    style={{
      marginTop: "10px",
    }}
  >
    {
      isEditingAddress
        ? "Save Address"
        : "Change Address"
    }
  </button>

</div>

          <button
  className="payment-btn"
  onClick={() => {

    localStorage.setItem(
      "deliveryAddress",
      deliveryAddress
    );

    navigate("/payment");

  }}
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
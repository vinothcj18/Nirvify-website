import { useContext } from "react";
import { CartContext } from "../context/CartContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {

  const { cartItems, removeFromCart } =
  useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
const navigate = useNavigate();
  return (
    <div>

      <Navbar />

      <section className="cart-page">

        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (

          <p>Your cart is empty.</p>

        ) : (

          <>

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="cart-item"
              >

                <img
                  src={item.images[0]}
                  alt={item.name}
                />

                <div>

                  <h3>{item.name}</h3>

                  <p>₹{item.price}</p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Subtotal:
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    className="remove-btn"
                    onClick={() =>
                    removeFromCart(item._id)
  }
>
  Remove
</button>

                </div>

              </div>

            ))}

            <h2>
              Total Amount: ₹{totalAmount}
            </h2>
            <button
  className="checkout-btn"
  onClick={() =>
    navigate("/checkout")
  }
>
  Proceed To Checkout
</button>
          </>

        )}

      </section>

      <Footer />

    </div>
  );
}

export default Cart;
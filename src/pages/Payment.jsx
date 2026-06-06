import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/Payment.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Payment() {
const navigate = useNavigate();
  const [paymentProof, setPaymentProof] = useState(null);
const [showSuccess, setShowSuccess] = useState(false);

const { cartItems, clearCart } =
  useContext(CartContext);
const buyNowProduct = JSON.parse(
  localStorage.getItem("buyNowProduct")
);

const orderItems =
  buyNowProduct
    ? [buyNowProduct]
    : cartItems;

const user = JSON.parse(
  localStorage.getItem("user")
);



const totalAmount = orderItems?.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
) || 0;

 const handleSubmit = async () => {

  if (!paymentProof) {

    alert(
      "Please upload payment screenshot before submitting."
    );

    return;
  }

  try {

    const formData = new FormData();

    formData.append(
      "customerName",
      user.name
    );

    formData.append(
      "email",
      user.email
    );

    formData.append(
      "phone",
      user.phone
    );

    formData.append(
      "address",
      user.address
    );

    formData.append(
      "products",
      JSON.stringify(orderItems)
    );

    formData.append(
      "totalAmount",
      totalAmount
    );

    formData.append(
      "paymentScreenshot",
      paymentProof
    );

    await axios.post(
      "https://nirvify-backend.onrender.com/api/orders",
      formData
    );

    setShowSuccess(true);

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Order submission failed"
    );

  }

};

  return (
    <div>

      <Navbar />

      <div className="payment-container">

        <h1>Payment</h1>

        <div className="payment-card">

          <h3>Scan QR To Pay</h3>

          <img
            src="/images/payment/dummyQr.jpeg"
            alt="QR Code"
            className="qr-image"
          />

          <p>
            Complete the payment and upload
            the screenshot below.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPaymentProof(
                e.target.files[0]
              )
            }
          />

          <button
            className="submit-btn"
            onClick={handleSubmit}
          >
            Submit Order
          </button>

        </div>

      </div>
        {showSuccess && (

  <div className="success-overlay">

    <div className="success-modal">

      <h2>
        🎉 Thank You For Your Order!
      </h2>

      <p>
        Your order has been submitted
        successfully.
      </p>

      <button
            onClick={() => {
            clearCart();

localStorage.removeItem(
  "buyNowProduct"
);

navigate("/");}}
            >Done
        </button>

    </div>

  </div>

)}
      <Footer />

    </div>
  );
}

export default Payment;
import { useState } from "react";

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
const { clearCart } = useContext(CartContext);

 const handleSubmit = () => {

  if (!paymentProof) {

    alert(
      "Please upload payment screenshot before submitting."
    );

    return;

  }

  setShowSuccess(true);

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
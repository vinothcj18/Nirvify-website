import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/ProductDetails.css";

import products from "../data/products";

function ProductDetails() {

  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  return (
    <div>
      <Navbar />

      <section className="details-section">

        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="details-content">

          <h1>{product.name}</h1>

          <p className="price">{product.price}</p>

          <p className="category">
            Category: {product.category}
          </p>

          

          <div className="payment-box">

            <h3>Payment</h3>

            <img
              src="https://via.placeholder.com/200"
              alt="QR Code"
            />

            <p>Scan QR and complete payment</p>

           

          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}

export default ProductDetails;
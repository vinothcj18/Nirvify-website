import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/ProductDetails.css";

import products from "../data/products";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );
  const [selectedImage, setSelectedImage] = useState(
  product?.images?.[0]
);
const [quantity, setQuantity] = useState(1);
const { addToCart } = useContext(CartContext);
  if (!product) {
    return (
      <div>
        <Navbar />
        <h1>Product Not Found</h1>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <section className="details-section">

        <div className="details-image">

  <div className="thumbnail-container">

    {product.images.map((img, index) => (

      <img
        key={index}
        src={img}
        alt={`Thumbnail ${index + 1}`}
        className={`thumbnail ${
  selectedImage === img ? "active-thumbnail" : ""
}`}
        onClick={() => setSelectedImage(img)}
      />

    ))}

  </div>

  <img
    src={selectedImage}
    alt={product.name}
    className="main-image"
  />

</div>

        <div className="details-content">

          <h1>{product.name}</h1>

          <p className="price">
            ₹{product.price}
          </p>

          <p className="category">
            Category: {product.category}
          </p>

          <p className="rating">
            {product.averageRating > 0
              ? `⭐ ${product.averageRating} (${product.reviewCount} Reviews)`
              : "Rating: Not Rated Yet"}
          </p>

          <div className="quantity-section">

  <label>Quantity:</label>

  <div className="quantity-controls">

    <button
      onClick={() =>
        quantity > 1 &&
        setQuantity(quantity - 1)
      }
    >
      -
    </button>

    <span>{quantity}</span>

    <button
      onClick={() =>
        setQuantity(quantity + 1)
      }
    >
      +
    </button>

  </div>

</div>

          <div className="button-group">

            <button
  className="cart-btn"
  onClick={() =>
    addToCart(product, quantity)
  }
>
  Add To Cart
</button>

            <button className="buy-btn">
              Buy Now
            </button>

          </div>

        </div>

      </section>

      <section className="about-product">

        <h2>About This Product</h2>

        <ul>

          {product.description?.map((point, index) => (
            <li key={index}>
              {point}
            </li>
          ))}

        </ul>

      </section>

      <Footer />
    </div>
  );
}

export default ProductDetails;
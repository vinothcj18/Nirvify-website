import { useParams } from "react-router-dom";
import { useState, useContext,useEffect } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";



function ProductDetails() {
  const { id } = useParams();
const navigate = useNavigate();
useEffect(() => {

  fetchProduct();

}, [id]);

const fetchProduct =
  async () => {

    try {

      const response =
        await fetch(
          `https://nirvify-backend.onrender.com/api/products/${id}`
        );

      const data =
        await response.json();

      setProduct(data);

      setSelectedImage(
        data.images?.[0]
      );

      if (
  data.colors &&
  data.colors.length > 0
) {

  setSelectedColor(
    data.colors[0]
  );

}

    } catch (error) {

      console.log(error);

    }

  };
  const [product, setProduct] =
  useState(null);
  const [selectedImage,
  setSelectedImage] =
  useState("");
const [quantity, setQuantity] = useState(1);
const [selectedColor, setSelectedColor] = useState("");
const { addToCart } = useContext(CartContext);
console.log("Product:", product);
console.log("ID:", id);
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

          {product.colors?.length > 0 && (

  <div className="color-section">

    <h4>
      Available Colors:
    </h4>

    <div className="color-list">

      {product.colors.map(
        (color, index) => (

          <button
            key={index}
            className={`color-tag ${
              selectedColor === color
                ? "selected-color"
                : ""
            }`}
            onClick={() =>
              setSelectedColor(
                color
              )
            }
          >
            {color}
          </button>

        )
      )}

    </div>

    <p>
      Selected:
      {" "}
      <strong>
        {selectedColor}
      </strong>
    </p>

  </div>

)}

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
  onClick={() => {
  console.log("ADD TO CART CLICKED");
  console.log(product);
  addToCart(
  {
    ...product,
    selectedColor,
  },
  quantity
);
}}
>
  Add To Cart
</button>

            <button
  className="buy-btn"
  onClick={() => {

    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify({
  ...product,
  quantity,
  selectedColor,
})
    );

    navigate("/checkout");

  }}
>
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
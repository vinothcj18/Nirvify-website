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
const [reviews, setReviews] =useState([]);
const [rating, setRating] =useState(5);
const [comment, setComment] =useState("");
useEffect(() => {

  fetchProduct();
  fetchReviews();
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

  
  const [product, setProduct] =useState(null);
  const [selectedImage,setSelectedImage] =useState("");
const [quantity, setQuantity] = useState(1);
const [selectedColor, setSelectedColor] = useState("");
const { addToCart } = useContext(CartContext);
console.log("Product:", product);
console.log("ID:", id);
const fetchReviews =
  async () => {

    try {

      const response =
        await fetch(
          `https://nirvify-backend.onrender.com/api/reviews/${id}`
        );

      const data =
        await response.json();

      setReviews(data);

    } catch (error) {

      console.log(error);

    }

  };

const submitReview =
  async () => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (!user) {

      alert(
        "Please login to review."
      );

      return;

    }

    try {

      await fetch(
        "https://nirvify-backend.onrender.com/api/reviews",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            productId: id,
            userName: user.name,
            rating,
            comment,
          }),
        }
      );

      alert(
        "Review submitted successfully"
      );

      setComment("");

      fetchReviews();
      fetchProduct();

    } catch (error) {

      console.log(error);

    }

  };

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
          <section className="review-section">

  <h2>
    Write A Review
  </h2>

  <select
    value={rating}
    onChange={(e) =>
      setRating(
        Number(
          e.target.value
        )
      )
    }
  >

    <option value="5">
      ⭐⭐⭐⭐⭐
    </option>

    <option value="4">
      ⭐⭐⭐⭐
    </option>

    <option value="3">
      ⭐⭐⭐
    </option>

    <option value="2">
      ⭐⭐
    </option>

    <option value="1">
      ⭐
    </option>

  </select>

  <br />
  <br />

  <textarea
    rows="4"
    placeholder="Write your review..."
    value={comment}
    onChange={(e) =>
      setComment(
        e.target.value
      )
    }
  />

  <br />
  <br />

  <button
    onClick={submitReview}
  >
    Submit Review
  </button>

</section>

<section className="review-list">

  <h2>
    Customer Reviews
  </h2>

  {reviews.length === 0 ? (

    <p>
      No Reviews Yet
    </p>

  ) : (

    reviews.map(
      (review) => (

        <div
          key={review._id}
          className="review-card"
        >

          <h4>
            {review.userName}
          </h4>

          <p>
            {"⭐".repeat(
              review.rating
            )}
          </p>

          <p>
            {review.comment}
          </p>

        </div>

      )
    )

  )}

</section>
      <Footer />
    </div>
  );
}

export default ProductDetails;
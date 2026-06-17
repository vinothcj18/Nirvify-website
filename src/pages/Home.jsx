import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
    const navigate = useNavigate();
    const [featuredProducts,setFeaturedProducts] =useState([]);
    
useEffect(() => {

  fetchProducts();

}, []);

const fetchProducts =
  async () => {

    try {

      const response =
        await axios.get(
          "https://nirvify-backend.onrender.com/api/products"
        );

      setFeaturedProducts(
        response.data.slice(0, 3)
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div>
      <Navbar />

      <section className="hero">
        <h1>Welcome to Nirvify</h1>

        <p>
          Handcrafted paper crafts and creative handmade products
          designed with love and creativity.
        </p>

    

        <button onClick={() => navigate("/shop")}>
            Explore Shop
        </button>
      </section>

      <section className="about">
        <h2>About Nirvify</h2>

        <p>
          Nirvify is a handcrafted brand creating beautiful paper crafts,
          customized gifts, explosion boxes, decorations, and creative
          handmade products for every special moment in your life.
        </p>

        <p>
          Every product is carefully designed with creativity, love,
          and attention to detail to make your memories even more special.
        </p>
      </section>
      <section className="featured-products">
  <h2>Featured Products</h2>

  <div className="product-container">

  {featuredProducts.map(
    (product) => (

      <div
  key={product._id}
  className="product-card"
  onClick={() =>
    navigate(
      `/product/${product._id}`
    )
  }
>

        <img
          src={
            product.images?.[0]
          }
          alt={
            product.name
          }
        />

        <h3>
          {product.name}
        </h3>

        <p>
          ₹{product.price}
        </p>

      </div>

    )
  )}

</div>
</section>

      <Footer />
    </div>
  );
}

export default Home;
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();
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

    <div className="product-card">
      <img
        src="https://via.placeholder.com/250"
        alt="product"
      />

      <h3>Explosion Box</h3>
      <p>₹499</p>
    </div>

    <div className="product-card">
      <img
        src="https://via.placeholder.com/250"
        alt="product"
      />

      <h3>Paper Flower Bouquet</h3>
      <p>₹299</p>
    </div>

    <div className="product-card">
      <img
        src="https://via.placeholder.com/250"
        alt="product"
      />

      <h3>Customized Scrapbook</h3>
      <p>₹699</p>
    </div>

  </div>
</section>

      <Footer />
    </div>
  );
}

export default Home;
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Shop.css";

import { useState } from "react";
import products from "../data/products";

function Shop() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const filteredProducts = products.filter((product) => {

  const matchesSearch =
    product.name.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;

});

  return (
    <div>
      <Navbar />

      <section className="shop-section">
        <h1>Our Products</h1>

        <div className="shop-controls">

          <input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

          
            <select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option>All</option>
  <option>Gift</option>
  <option>Decoration</option>
  <option>Birthday</option>
  <option>Wedding</option>
</select>

        </div>

        <div className="shop-products">

          {filteredProducts.map((product) => (
            <div
  className="shop-card"
  key={product.id}
  onClick={() => window.location.href = `/product/${product.id}`}
>

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>{product.price}</p>

            </div>
          ))}

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Shop;
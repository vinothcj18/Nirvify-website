import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Shop.css";

import { useState,useEffect } from "react";


function Shop() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [products, setProducts] =useState([]);
    useEffect(() => {

  fetchProducts();

}, []);

const fetchProducts =
  async () => {

    try {

      const response =
        await fetch(
          "https://nirvify-backend.onrender.com/api/products"
        );

      const data =
        await response.json();

      setProducts(data);

    } catch (error) {

      console.log(error);

    }

  };
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
  <option>Craft Materials</option>
</select>

        </div>

        <div className="shop-products">

          {filteredProducts.map((product) => (
            <div
  className="shop-card"
  key={product._id}
  onClick={() => window.location.href = `/product/${product._id}`}
>

              <img
                src={product.images[0]}
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
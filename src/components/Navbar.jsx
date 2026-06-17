import { Link } from "react-router-dom";
import { useContext,useState } from "react";

import { CartContext } from "../context/CartContext";

import "../styles/Navbar.css";

function Navbar() {

  const { cartItems } = useContext(CartContext);

  const user = JSON.parse(
    localStorage.getItem("user")
  );
const [menuOpen,setMenuOpen] =useState(false);
  
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  

  return (
    <nav className="navbar">

      <h2 className="logo">

  <img
    src="https://res.cloudinary.com/dkh6ayavi/image/upload/q_auto/f_auto/v1781715761/476328888_1164835108708256_814700794095948952_n-removebg-preview_d1t4wk.png"
    alt="Nirvify Logo"
    className="logo-img"
  />

  Nirvify

</h2>
      <button
  className="menu-btn"
  onClick={() =>
    setMenuOpen(
      !menuOpen
    )
  }
>
  ☰
</button>

      <div
  className={`nav-links ${
    menuOpen
      ? "active"
      : ""
  }`}
>

  <Link to="/">Home</Link>

  <Link to="/shop">Shop</Link>

 {user?.role !== "admin" && (
  <Link to="/my-orders">
    My Orders
  </Link>
)}

<Link to="/cart">
  Cart ({totalItems})
</Link>

  {user?.role === "admin" && (
  <>
    <Link
  to="/admin/dashboard"
>
  Dashboard
</Link>
     
    <Link to="/admin-orders">
      Admin Orders
    </Link>

    <Link to="/admin-products">
      Admin Products
    </Link>
  </>
)}

  {!user ? (

  <>
    <Link to="/login">
      Login
    </Link>

    <Link to="/signup">
      Sign Up
    </Link>
  </>

) : (

  <>
    <Link to="/profile">
      Profile
    </Link>

    <button
      className="logout-btn"
      onClick={() => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        window.location.href = "/";

      }}
    >
      Logout
    </button>
  </>

)}

</div>

    </nav>
  );
}

export default Navbar;
import { Link } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../context/CartContext";

import "../styles/Navbar.css";

function Navbar() {

  const { cartItems } = useContext(CartContext);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  

  return (
    <nav className="navbar">

      <h2 className="logo">Nirvify</h2>

      <div className="nav-links">

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
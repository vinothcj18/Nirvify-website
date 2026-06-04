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

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.reload();

  };

  return (
    <nav className="navbar">

      <h2 className="logo">Nirvify</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/shop">Shop</Link>

        <Link to="/cart">
          Cart ({totalItems})
        </Link>

        {user ? (
          <>

           <Link to="/profile">
  Hello, {user.name}
</Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>
        ) : (
          <>

            <Link to="/login">
              Login
            </Link>

            <Link to="/signup">
              Signup
            </Link>

          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
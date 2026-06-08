import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/MyOrders.css";

function MyOrders() {

  const [orders, setOrders] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

if (!user) {

  return (
    <h1
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      Please Login
    </h1>
  );

}

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const response =
        await axios.get(
          `https://nirvify-backend.onrender.com/api/orders/user/${user.email}`
        );

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div>

      <Navbar />

      <div className="my-orders">

        <h1>My Orders</h1>

        {orders.length === 0 ? (

          <p>No Orders Found</p>

        ) : (

          orders.map((order) => (

            <div
              key={order._id}
              className="order-card"
            >

              {order.products.map(
                (product, index) => (

                  <div key={index}>

  <h3>
    {product.name}
  </h3>

  <p>
    Quantity:
    {product.quantity}
  </p>

  {product.selectedColor && (

    <p>
      Color:
      {" "}
      {product.selectedColor}
    </p>

  )}

</div>

                )
              )}

              <p
                className={`status ${
                  order.orderStatus.toLowerCase()
                }`}
              >
                Status:
                {order.orderStatus}
              </p>
              <p>
  Order Date:{" "}
  {new Date(
    order.createdAt
  ).toLocaleDateString("en-IN")}
</p>
            </div>

          ))

        )}

      </div>

      <Footer />

    </div>
  );
}

export default MyOrders;
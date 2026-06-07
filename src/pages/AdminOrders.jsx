import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminOrders.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (
    !user ||
    user.role !== "admin"
  ) {

    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Access Denied
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
          "https://nirvify-backend.onrender.com/api/orders"
        );

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }

  };

const updateStatus = async (
  id,
  status
) => {

  try {

    await axios.put(
      `https://nirvify-backend.onrender.com/api/orders/${id}`,
      {
        status,
      }
    );

    fetchOrders();

  } catch (error) {

    console.log(error);

  }

};

  return (
    <div>

      <Navbar />

      <div className="admin-orders">

        <h1>
          Customer Orders
        </h1>

        {orders.length === 0 ? (

          <p>No Orders Found</p>

        ) : (

          orders.map((order) => (

  <div
    key={order._id}
    className="order-card"
  >

    <h3>
      {order.customerName}
    </h3>

    <p>
      Email:
      {order.email}
    </p>

    <p>
      Phone:
      {order.phone}
    </p>

    <p>
      Address:
      {order.address}
    </p>

    <p>
      Total:
      ₹{order.totalAmount}
    </p>

    <h4>Products:</h4>

    <ul>

      {order.products.map(
        (product, index) => (

          <li key={index}>
            {product.name}
            {" "}x{" "}
            {product.quantity}
          </li>

        )
      )}

    </ul>

    <p>
      Status:
      {order.orderStatus}
    </p>
    <p>
  Order Date:{" "}
  {new Date(
    order.createdAt
  ).toLocaleDateString("en-IN")}
</p>

<div style={{ marginTop: "10px" }}>

  {order.orderStatus === "Pending" && (

    <button
      className="status-btn approve-btn"
      onClick={() =>
        updateStatus(
          order._id,
          "Approved"
        )
      }
    >
      Approve
    </button>

  )}

  {order.orderStatus === "Approved" && (
    <>
      <button
        className="status-btn delivered-btn"
        onClick={() =>
          updateStatus(
            order._id,
            "Delivered"
          )
        }
      >
        Delivered
      </button>

      <button
        className="status-btn cancel-btn"
        onClick={() =>
          updateStatus(
            order._id,
            "Pending"
          )
        }
      >
        Cancel Approve
      </button>
    </>
  )}

  {order.orderStatus === "Delivered" && (

    <button
      className="status-btn cancel-btn"
      onClick={() =>
        updateStatus(
          order._id,
          "Approved"
        )
      }
    >
      Cancel Deliver
    </button>

  )}

</div>

    <a
  href={`https://nirvify-backend.onrender.com/uploads/${order.paymentScreenshot}`}
  target="_blank"
  rel="noreferrer"
  className="screenshot-btn"
>
  View Screenshot
</a>
  </div>

))

        )}

      </div>

      <Footer />

    </div>
  );
}

export default AdminOrders;
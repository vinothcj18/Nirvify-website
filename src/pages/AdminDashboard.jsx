import { useEffect, useState }
from "react";

import axios from "axios";

import Navbar
from "../components/Navbar";

import Footer
from "../components/Footer";

import "../styles/AdminDashboard.css";

function AdminDashboard() {

  const [stats, setStats] =
    useState({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
    });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

      try {

        const response =
          await axios.get(
            "https://nirvify-backend.onrender.com/api/dashboard"
          );

          console.log(
  response.data
);

        setStats(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div>

      <Navbar />

      <div className="dashboard-container">

        <h1>
          Admin Dashboard
        </h1>

        <div className="dashboard-grid">

          <div className="dashboard-card">

            <h3>
              Products
            </h3>

            <p>
              {
                stats.totalProducts
              }
            </p>

          </div>

          <div className="dashboard-card">

            <h3>
              Orders
            </h3>

            <p>
              {
                stats.totalOrders
              }
            </p>

          </div>

          <div className="dashboard-card">

            <h3>
              Revenue
            </h3>

            <p>
              ₹{
                stats.totalRevenue
              }
            </p>

          </div>

          <div className="dashboard-card">

            <h3>
              Pending Orders
            </h3>

            <p>
              {
                stats.pendingOrders
              }
            </p>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default
AdminDashboard;
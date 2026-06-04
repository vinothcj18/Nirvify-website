import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Profile.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
const user = JSON.parse(
  localStorage.getItem("user")
);

const [phone, setPhone] = useState(
  user?.phone || ""
);

const [address, setAddress] = useState(
  user?.address || ""
);
const navigate = useNavigate();
const handleSave = async () => {

  try {

    const response = await axios.put(
      "http://localhost:5000/api/auth/profile",
      {
        email: user.email,
        phone,
        address,
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

   

navigate("/");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Update failed"
    );

  }

};

  return (
    <div>

      <Navbar />
        
      <div className="profile-container">
<button
  className="close-btn"
  onClick={() => navigate("/")}
>
  ✕
</button>

        <h1>My Profile</h1>

        <div className="profile-card">

  <p>
    <strong>Name:</strong>{" "}
    {user?.name}
  </p>

  <p>
    <strong>Email:</strong>{" "}
    {user?.email}
  </p>

  <label>Phone Number</label>

  <input
    type="text"
    value={phone}
    onChange={(e) =>
      setPhone(e.target.value)
    }
  />

  <label>Address</label>

  <textarea
    rows="4"
    value={address}
    onChange={(e) =>
      setAddress(e.target.value)
    }
  />

  <button
    className="save-btn"
    onClick={handleSave}
  >
    Save Changes
  </button>

</div>

      </div>

      <Footer />

    </div>
  );
}

export default Profile;
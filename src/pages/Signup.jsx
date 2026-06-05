import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
const [showPassword, setShowPassword] =useState(false);
  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          phone,
          password,
        }
      );

      localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSignup}
      >

        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          required
        />

        <input
          type={showPassword? "text": "password"}
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <label className="show-password">

  <input
    type="checkbox"
    checked={showPassword}
    onChange={() =>
      setShowPassword(
        !showPassword
      )
    }
  />

  Show Password

</label>

        <button
  className="auth-btn"
>
  Sign Up
</button>

<button
  className="close-btn"
  onClick={() => navigate("/")}
>
  ✕
</button>

      </form>

    </div>
  );
}

export default Signup;
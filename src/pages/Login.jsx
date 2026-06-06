import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://nirvify-backend.onrender.com/api/auth/login",
        {
          email,
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
        "Login failed"
      );

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleLogin}
      >

        <h2>Login</h2>

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
  type={
    showPassword
      ? "text"
      : "password"
  }
  placeholder="Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
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
  Login
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

export default Login;
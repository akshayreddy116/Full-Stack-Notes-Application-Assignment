import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/client";

import "../styles/home.css";

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/notes");
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Login failed (Check backend)"
      );
    }
  };

  const signup = async () => {
    try {
      await API.post("/auth/signup", {
        email,
        password,
      });
      setIsLogin(true);
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Signup failed "
      );
    }
  };

  return (
    <div className="main-layout">
      <div className="content">
        <div className="hero-text">
          <h1>
            <span className="highlight">Note</span> taking,
            <br />
            made simple
          </h1>

          <p>
            Passionately made for students. <br />
            Simple Markdown Notes App.
          </p>

          <button className="hero-btn">Try for Free</button>
        </div>
        <div className="auth-card">
          <h2>
            {isLogin ? "Welcome Back " : "Create Account "}
          </h2>
          <div className="toggle">
            <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
              Signup
            </button>
          </div>

          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

          {isLogin ? (
            <button onClick={login}>Login</button>
          ) : (
            <button onClick={signup}>Signup</button>
          )}

        </div>
      </div>
    </div>
  );
}
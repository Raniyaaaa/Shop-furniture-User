import React, { useRef, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/authUserSlice"; // Updated slice path for user authentication

const UserLogin = () => {
  const API_KEY = "abcd";
  const [isLogin, setIsLogin] = useState(true); // Default to login mode
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetForm = () => {
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    if (confirmPasswordInputRef.current) {
      confirmPasswordInputRef.current.value = "";
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();
    const enteredConfirmPassword = confirmPasswordInputRef.current
      ? confirmPasswordInputRef.current.value.trim()
      : "";

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessage =
          data?.error?.message || "Authentication failed!";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);
      dispatch(login({ token: data.idToken, email: data.email }));
      navigate("/"); // Redirect to home after login/signup
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f7f6",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              id="email"
              ref={emailInputRef}
              placeholder="Email"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              id="password"
              ref={passwordInputRef}
              placeholder="Password"
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          {!isLogin && (
            <div style={{ marginBottom: "15px" }}>
              <input
                type="password"
                id="confirmPassword"
                ref={confirmPasswordInputRef}
                placeholder="Confirm Password"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                }}
              />
            </div>
          )}
          <div style={{ marginBottom: "20px" }}>
            <Button
              variant="primary"
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </div>
          {isLogin && (
            <div style={{ textAlign: "center" }}>
              <Link to="/forgetpassword" style={{ fontSize: "14px" }}>
                Forgot password?
              </Link>
            </div>
          )}
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Alert
            variant="success"
            onClick={toggleAuthModeHandler}
            style={{
              cursor: "pointer",
              fontSize: "16px",
              padding: "10px",
              backgroundColor: "#e7f9f7",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Have an account? Login"}
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

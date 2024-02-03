import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function bodyColor() {
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.margin = "0 auto";
  }
  bodyColor();
  const handleSubmit = async () => {
    try {
      const login = { email, password };
      console.log(login);

      const res = await fetch(
        "https://bloggy-2gzg.onrender.com/api/users/login",
        {
          method: "POST",
          body: JSON.stringify(login),
          headers: { "Content-type": "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  return (
    <div className="loginstyles">
      <h3 className="text-dark">Welcome Back</h3>
      <p>User Login: Username : venkat@bloggy.co and Password : venkat123</p>
      <p>
        User Login: Username : admin@example.com and Password : adminpassword
      </p>
      <Form className="login-form d-grid">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email || ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password || ""}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <div className="login-signup">
          <Button size="lg" variant="primary" onClick={handleSubmit}>
            Login
          </Button>
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </div>
      </Form>
    </div>
  );
}

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Col from "react-bootstrap/Col";

import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  function bodyColor() {
    document.body.style.backgroundColor = "blue";
    document.body.style.margin = "0 auto";
  }
  bodyColor();
  const handleSignup = async () => {
    const signup = { name, email, contact, password };
    const res = await fetch(
      "https://bloggy-2gzg.onrender.com/api/users/signup",
      {
        method: "POST",
        body: JSON.stringify(signup),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const result = await res.json();
    if (result.token) {
      localStorage.setItem("token", result.token);
      navigate("/");
    }
  };
  return (
    <div className="loginstyles">
      <h3>Welcome</h3>
      <Form className="login-form d-grid">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Row className="mb-0">
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="number"
            placeholder="Contact"
            value={contact || ""}
            onChange={(e) => setContact(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button size="lg" variant="success" onClick={handleSignup}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;

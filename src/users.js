import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Base from "./base";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchAPI() {
      const res = await fetch(
        `https://bloggy-2gzg.onrender.com/api/users/all`,
        {
          method: "GET",
        }
      );
      const result = await res.json();

      setUsers(result.data);
    }
    fetchAPI();
  }, []);
  function handleUser(userid) {
    navigate(`/userquestions/${userid}`);
  }
  return (
    <div className="users-page">
      <Base>
        <h3>Users Data</h3>
        <Container>
          <Row>
            {users?.map((user, idx) => (
              <Col md={6} key={idx}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {user.email}
                    </Card.Subtitle>

                    <Card.Link href="" onClick={() => handleUser(user._id)}>
                      View Questions
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Base>
    </div>
  );
}

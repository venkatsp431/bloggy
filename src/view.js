import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import Base from "./base";
import { useNavigate, useParams } from "react-router-dom";

const ViewPost = ({ blogs, setBlogs }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [body, setbody] = useState("");

  useEffect(() => {
    async function getquest() {
      const res = await fetch(`http://localhost:7070/api/blogs/question/${id}`);
      const res1 = await res.json();
      if (res1) {
        settitle(res1.data.title);
        setcategory(res1.data.category);
        setbody(res1.data.body);
        console.log(res1.data.body);
      }
    }
    getquest();
  }, []);

  const handleClick = async function () {
    const ques = { title, category, body };

    const res = await fetch(`http://localhost:7070/api/blogs/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify(ques),
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await res.json();

    navigate("/");
  };

  console.log(id);
  return (
    <>
      <Base>
        <header className="py-2 bg-primary text-white">
          <Container>
            <Row>
              <Col md={6}>
                <h1>{title}</h1>
              </Col>
            </Row>
          </Container>
        </header>

        {/* ACTIONS */}
        <section className="py-4 mb-4 bg-light">
          <Container>
            <Row>
              <Col md={3}>
                <Button href="index.html" variant="light" block>
                  <i className="fas fa-arrow-left"></i> Back To Dashboard
                </Button>
              </Col>
              <Col md={3}>
                <Button variant="success" onClick={handleClick} block>
                  <i className="fas fa-check"></i> Save Changes
                </Button>
              </Col>
              <Col md={3}>
                <Button href="index.html" variant="danger" block>
                  <i className="fas fa-trash"></i> Delete Post
                </Button>
              </Col>
            </Row>
          </Container>
        </section>

        {/* DETAILS */}
        <section id="details">
          <Container>
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <h4>Edit Post</h4>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" defaultValue={title} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select">
                          <option value="" selected>
                            {category}
                          </option>
                          <option value="">Web Development</option>
                          <option value="">Tech Gadgets</option>
                          <option value="">Business</option>
                          <option value="">Health & Wellness</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Upload Image</Form.Label>
                        <div className="custom-file">
                          <Form.Control
                            type="file"
                            className="custom-file-input"
                            id="image"
                          />
                          <Form.Label
                            className="custom-file-label"
                            htmlFor="image"
                          >
                            Choose File
                          </Form.Label>
                        </div>
                        <small className="form-text text-muted">
                          Max Size 3mb
                        </small>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" name="editor1">
                          {body}
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Base>
    </>
  );
};

export default ViewPost;

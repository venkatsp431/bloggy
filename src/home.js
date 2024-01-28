import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Modal,
  Form,
  Card,
  Table,
  Col,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Base from "./base";

const Home = ({ blogs, setBlogs }) => {
  const posts = [
    {
      id: 1,
      title: "Post One",
      category: "Web Development",
      date: "May 10 2018",
    },
    { id: 2, title: "Post Two", category: "Tech Gadgets", date: "May 11 2018" },
    {
      id: 3,
      title: "Post Three",
      category: "Web Development",
      date: "May 13 2018",
    },
    { id: 4, title: "Post Four", category: "Business", date: "May 15 2018" },
    {
      id: 5,
      title: "Post Five",
      category: "Web Development",
      date: "May 17 2018",
    },
    {
      id: 6,
      title: "Post Six",
      category: "Health & Wellness",
      date: "May 20 2018",
    },
  ];
  const navigate = useNavigate();
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    body: "",
  });
  const handleCloseAddPostModal = async () => {
    setShowAddPostModal(false);

    try {
      const response = await fetch(
        "https://bloggy-2gzg.onrender.com/api/blogs/postblog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...blogData,
            // Add any additional data you need to send
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      // Update state with the new blog
      setBlogs([...blogs, responseData.data]);

      // Reset the form data for the next post
      setBlogData({
        title: "",
        category: "",
        body: "",
      });
    } catch (error) {
      console.error("Error posting blog:", error);
      // Handle errors here
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handledelete = async (id) => {
    try {
      const response = await fetch(
        `https://bloggy-2gzg.onrender.com/api/blogs/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the deleted blog from the state
      setBlogs(blogs.filter((blog) => blog._id !== id));

      console.log("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      // Handle errors here
    }
  };

  const handleShowAddPostModal = () => setShowAddPostModal(true);

  const handleCloseAddCategoryModal = () => setShowAddCategoryModal(false);
  const handleShowAddCategoryModal = () => setShowAddCategoryModal(true);

  const handleCloseAddUserModal = () => setShowAddUserModal(false);
  const handleShowAddUserModal = () => setShowAddUserModal(true);

  return (
    <>
      <Base>
        {/* Header */}
        <header id="main-header" className="py-2 bg-primary text-white">
          <Container>
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-cog"></i> Dashboard
                </h1>
              </div>
            </div>
          </Container>
        </header>

        {/* Actions */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <Container>
            <div className="row">
              <div className="col-md-3">
                <Button
                  variant="primary"
                  className="btn-block"
                  onClick={handleShowAddPostModal}
                >
                  <i className="fas fa-plus"></i> Add Post
                </Button>
              </div>
              <div className="col-md-3">
                <Button
                  variant="success"
                  className="btn-block"
                  onClick={handleShowAddCategoryModal}
                >
                  <i className="fas fa-plus"></i> Add Category
                </Button>
              </div>
              {/* <div className="col-md-3">
                <Button
                  variant="warning"
                  className="btn-block"
                  onClick={handleShowAddUserModal}
                >
                  <i className="fas fa-plus"></i> Add User
                </Button>
              </div> */}
            </div>
          </Container>
        </section>
        <section id="posts">
          <Container>
            <Row>
              <Col md={9}>
                <Card>
                  <Card.Header>
                    <h4>Latest Posts</h4>
                  </Card.Header>
                  <Table striped bordered hover>
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((post) => (
                        <tr key={post._id}>
                          <td>{post.id}</td>
                          <td>{post.title}</td>
                          <td>{post.category}</td>
                          <td>{post.createdAt.slice(0, 10)}</td>
                          <td>
                            <Button
                              variant="secondary"
                              onClick={() => navigate(`/editpost/${post._id}`)}
                            >
                              <i className="fas fa-angle-double-right"></i>{" "}
                              Details
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handledelete(post.id)}
                            >
                              <i className="fas fa-angle-double-right"></i>{" "}
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center bg-primary text-white mb-3">
                  <Card.Body>
                    <h3>Posts</h3>
                    <h4 className="display-4">
                      <i className="fas fa-pencil-alt"></i> {posts.length}
                    </h4>
                    <Button variant="outline-light" size="sm" href="posts.html">
                      View
                    </Button>
                  </Card.Body>
                </Card>

                <Card className="text-center bg-success text-white mb-3">
                  <Card.Body>
                    <h3>Categories</h3>
                    <h4 className="display-4">
                      <i className="fas fa-folder"></i> 4
                    </h4>
                    <Button
                      variant="outline-light"
                      size="sm"
                      href="categories.html"
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Add Post Modal */}
        <Modal
          show={showAddPostModal}
          onHide={handleCloseAddPostModal}
          dialogClassName="modal-lg"
        >
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Post</h5>
              <button className="close" onClick={handleCloseAddPostModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group>
                  <Form.Label htmlFor="title">Title</Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    value={blogData.title}
                    onChange={handleInputChange}
                    name="title"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="category">Category</Form.Label>
                  <Form.Control
                    as="select"
                    id="category"
                    value={blogData.category}
                    onChange={handleInputChange}
                    name="category"
                  >
                    <option value="">Web Development</option>
                    <option value="">Tech Gadgets</option>
                    <option value="">Business</option>
                    <option value="">Health & Wellness</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="body">Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="body"
                    id="body"
                    value={blogData.body}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer">
              <Button variant="primary" onClick={handleCloseAddPostModal}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>

        {/* Add Category Modal */}
        <Modal
          show={showAddCategoryModal}
          onHide={handleCloseAddCategoryModal}
          dialogClassName="modal-lg"
        >
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Add Category</h5>
              <button className="close" onClick={handleCloseAddCategoryModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group>
                  <Form.Label htmlFor="categoryTitle">Title</Form.Label>
                  <Form.Control type="text" id="categoryTitle" />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer">
              <Button variant="success" onClick={handleCloseAddCategoryModal}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>

        {/* Add User Modal */}
        <Modal
          show={showAddUserModal}
          onHide={handleCloseAddUserModal}
          dialogClassName="modal-lg"
        >
          <div className="modal-content">
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">Add User</h5>
              <button className="close" onClick={handleCloseAddUserModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group>
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control type="text" id="name" />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control type="email" id="email" />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control type="password" id="password" />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password2">Confirm Password</Form.Label>
                  <Form.Control type="password" id="password2" />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer">
              <Button variant="warning" onClick={handleCloseAddUserModal}>
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      </Base>
    </>
  );
};

export default Home;

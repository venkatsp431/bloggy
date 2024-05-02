import React, { useEffect, useState } from "react";
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
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Base from "./base";

const Home = ({ blogs, setBlogs }) => {
  const [categories, setCategories] = useState([
    "Web Development",
    "Tech Gadgets",
    "Business",
    "Health & Wellness",
  ]);
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
      console.log(blogData);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://bloggy-2gzg.onrender.com/api/blogs/postblog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
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
    console.log(name, value);
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDelete = async (id) => {
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

  const handleShowAddCategoryModal = () => setShowAddCategoryModal(true);

  const handleCloseAddCategoryModal = () => {
    setShowAddCategoryModal(false);

    const newCategory = document.getElementById("categoryTitle").value;

    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };
  const handleCloseAddUserModal = () => setShowAddUserModal(false);
  const handleShowAddUserModal = () => setShowAddUserModal(true);
  const [userrole, setUserrole] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch blogs data
        const response = await fetch(
          "https://bloggy-2gzg.onrender.com/api/blogs/all"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    async function fetchUser() {
      const res = await fetch(
        "https://bloggy-2gzg.onrender.com/api/users/profile",
        {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const res1 = await res.json();
      setUsername(res1.name);
      setUserrole(res1.role);
    }

    if (localStorage.getItem("token")) {
      fetchUser();
      setLoggedIn(true);
    } else {
      console.log("No token");
      setLoggedIn(false);
    }

    fetchData();
  }, [token, setBlogs]);

  const handleCommentSubmit = async (postId, commentText) => {
    try {
      console.log(postId);
      const response = await fetch(
        `https://bloggy-2gzg.onrender.com/api/blogs/comment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ text: commentText }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      const commentInput = document.getElementById(`comment_${postId}`);
      if (commentInput) {
        commentInput.value = "";
      }
      const updatedBlogs = blogs.map((blog) => {
        if (blog._id === postId) {
          return {
            ...blog,
            comments: [...blog.comments, responseData.data],
          };
        }
        return blog;
      });
      console.log(updatedBlogs);
      setBlogs(updatedBlogs);

      // Update comments state
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

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
                  disabled={userrole !== "admin"}
                >
                  <i className="fas fa-plus"></i> Add Category
                </Button>
                {!loading && (
                  <small className="text-danger mx-4">
                    Only admins can add categories.
                  </small>
                )}
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
        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status"></Spinner>
          </div>
        )}
        {!loading && (
          <section id="posts">
            <Container>
              <Row>
                <Col md={9}>
                  {blogs.map((post) => (
                    <Card key={post._id} className="mb-4">
                      <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.body}</Card.Text>
                        <Card.Text>
                          Posted on {new Date(post.createdAt).toDateString()}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const commentText = e.target.elements.comment.value;
                            handleCommentSubmit(post._id, commentText);
                          }}
                        >
                          <Form.Group controlId={`comment_${post._id}`}>
                            <Form.Control
                              type="text"
                              placeholder="Add a comment..."
                              name="comment"
                            />
                          </Form.Group>
                          <Button
                            variant="primary"
                            type="submit"
                            className="mt-1"
                          >
                            Comment
                          </Button>
                        </Form>
                        {post.comments && (
                          <div className="mt-3">
                            <h5>Comments:</h5>
                            <ul>
                              {post.comments.map((comment, index) => (
                                <li key={index}>{comment.text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="mt-3">
                          <Button
                            variant="info"
                            className="mr-2"
                            onClick={() => navigate(`/editpost/${post._id}`)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(post._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Footer>
                    </Card>
                  ))}
                </Col>
              </Row>
            </Container>
          </section>
        )}
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
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
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

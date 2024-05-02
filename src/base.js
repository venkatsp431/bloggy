import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Base({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userrole, setUserrole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
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
      console.log(res1);
      setNotifications(res1.notifications);
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
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm" className="p-0">
        <Container>
          <Navbar.Brand href="#home">Bloggy</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          <Navbar.Collapse id="navbarCollapse">
            <Nav className="mr-auto">
              <Nav.Link href="#dashboard" className="px-2 active">
                Notifications
              </Nav.Link>
            </Nav>
            {loggedIn ? (
              <Nav className="ml-auto">
                <NavDropdown
                  title={
                    <>
                      <i className="fas fa-bell"></i>
                      {notifications?.length > 0 && (
                        <Badge pill variant="danger">
                          {notifications?.length}
                        </Badge>
                      )}
                    </>
                  }
                  id="notifications-dropdown"
                  className="mr-3"
                >
                  {notifications?.map((notification) => (
                    <NavDropdown.Item
                      key={notification?._id}
                      href="#notifications"
                    >
                      {notification.message}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <NavDropdown
                  title={
                    <>
                      <i className="fas fa-user"></i> Welcome {username}
                    </>
                  }
                  id="basic-nav-dropdown"
                  className="mr-3"
                ></NavDropdown>
                <Nav.Link href="#logout" onClick={handleLogout}>
                  <i className="fas fa-user-times"></i> Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <Button
                  style={{ color: "white" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>{children}</div>
      <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="lead text-center">
                Copyright &copy;
                <span id="year"></span>
                Bloggy
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Base;

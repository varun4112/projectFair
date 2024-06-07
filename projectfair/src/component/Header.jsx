import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { tokenAuthorizationContext } from "../Contexts/TokenAuth";

function Header({ insideDashboard }) {
  const { isAuthorized, setIsAuthorized } = useContext(
    tokenAuthorizationContext
  );
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");
    setIsAuthorized(false);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <Link to={"/"} style={{ color: "black", textDecoration: "none" }}>
            <i class="fa-solid fa-diagram-project"></i> Project Fair
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              {" "}
              <Link
                to={"/projects"}
                style={{ color: "black", textDecoration: "none" }}
              >
                Projects
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to={"/dashboard"}
                style={{ color: "black", textDecoration: "none" }}
              >
                Dashboard
              </Link>
            </Nav.Link>
          </Nav>
          {insideDashboard ? (
            <Nav.Link>
              {" "}
              <Link
                to={"/"}
                style={{ color: "black", textDecoration: "none" }}
                onClick={handleLogOut}
              >
                Log Out
              </Link>
            </Nav.Link>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

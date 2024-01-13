import { useContext } from "react";
import { appContext } from "../App";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function NavbarFunction() {
  // eslint-disable-next-line
  const { isLoggedIn, setToken, setIsLoggedIn } = useContext(appContext);
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      {[/* false, */ "sm" /* , 'md', 'lg', 'xl', 'xxl' */].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3 Navbar"
        >
          <Container fluid>
            <Navbar.Brand href="/products">K-shop</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/stores">Sell</Nav.Link>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                  {isLoggedIn ? (
                    <>
                      <NavDropdown
                        title="My Account"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item href="#">Orders</NavDropdown.Item>
                        <NavDropdown.Item href="/users/:id">
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/users/login">
                          <div onClick={logout}>Logout</div>
                        </NavDropdown.Item>
                      </NavDropdown>


                      <Nav.Link className="d-flex gap-1" href="#">
                        <i className="bi bi-heart"></i>
                        <label className="d-md-block d-sm-none d-block">
                          Fav
                        </label>
                      </Nav.Link>
                      
                      <Nav.Link className="d-flex gap-1" href="/carts">
                        <i className="bi bi-cart"></i>
                        <label className="d-md-block d-sm-none d-block">
                          Cart
                        </label>
                      </Nav.Link>


                    </>
                  ) : (
                    <>
                      <Nav.Link href="/users/login">Login</Nav.Link>
                      <Nav.Link href="/users/register">Register</Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarFunction;

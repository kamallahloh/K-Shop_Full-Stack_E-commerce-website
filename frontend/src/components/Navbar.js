import { useContext } from "react";
import { appContext } from "../App";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function OffcanvasExample() {
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
                        <NavDropdown.Item href="#action3">
                          Orders
                        </NavDropdown.Item>
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

export default OffcanvasExample;

// import React, { useContext } from "react";
// import { NavLink /* useNavigate */ } from "react-router-dom";
// import { appContext } from "../App";
// // eslint-disable-next-line
// import { Button /*Alert Breadcrumb */ } from "react-bootstrap";

// const Navbar = () => {
//   // const navigate = useNavigate();
//   // eslint-disable-next-line
//   const { isLoggedIn, setToken, setIsLoggedIn } = useContext(appContext);
//   // const logout = () => {
//   //   setToken(null);
//   //   localStorage.removeItem("token");
//   //   setIsLoggedIn(false);
//   //   localStorage.removeItem("isLoggedIn");
//   //   navigate("/");
//   // };

//   return (
//     <div className="navbar">
//       {isLoggedIn ? (
//         <>
//           <NavLink to="/products" /* reloadDocument */>Home</NavLink>
//           <NavLink to="/users/:id">My Account</NavLink>
//           <NavLink to="/carts">
//             <div className="btn btn-outline-danger" style={{ fontSize: "1.5rem", color: "black" }}>
//               <i className="bi bi-cart-fill"></i>
//             </div>
//           </NavLink>

//           {/*<Button
//           type="button"
//           variant="btn btn-outline-secondary btn-sm"
//           onClick={logout}
//         >
//           Logout
//         </Button>*/}
//         </>
//       ) : (
//         <>
//           {/* //! switch between user and store login */}
//           <NavLink to="/stores">Sell on K-shop</NavLink>
//           <NavLink to="/products">Home</NavLink>
//           <NavLink to="/users/login">Login</NavLink>
//           <NavLink to="/users/register">Register</NavLink>
//         </>
//       )}
//     </div>
//   );
// };

// export default Navbar;

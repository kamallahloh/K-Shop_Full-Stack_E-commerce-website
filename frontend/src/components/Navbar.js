import React, { useContext } from "react";
import { NavLink /* useNavigate */ } from "react-router-dom";
import { appContext } from "../App";
// eslint-disable-next-line
import { Button /*Alert Breadcrumb */ } from "react-bootstrap";

const Navbar = () => {
  // const navigate = useNavigate();
  // eslint-disable-next-line
  const { isLoggedIn, setToken, setIsLoggedIn } = useContext(appContext);
  // const logout = () => {
  //   setToken(null);
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   localStorage.removeItem("isLoggedIn");
  //   navigate("/");
  // };

  return (
    <div className="navbar navbar-expand-lg">
      {isLoggedIn ? (
        <>
          <NavLink to="/products" /* reloadDocument */>Home</NavLink>
          <NavLink to="/users/:id">My Account</NavLink>
          <NavLink to="/carts">
            +5
            <i className="bi bi-cart-fill"></i>
          </NavLink>

          {/*<Button
          type="button"
          variant="btn btn-outline-secondary btn-sm"
          onClick={logout}
        >
          Logout
        </Button>*/}
        </>
      ) : (
        <>
          {/* //! switch between user and store login */}
          <NavLink to="/stores">Sell on K-shop</NavLink>
          <NavLink to="/products">Home</NavLink>
          <NavLink to="/users/login">Login</NavLink>
          <NavLink to="/users/register">Register</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;

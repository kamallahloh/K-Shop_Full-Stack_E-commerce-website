import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { appContext } from "../App";

const Navbar = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setToken, setIsLoggedIn } = useContext(appContext);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="navbar">
      {isLoggedIn ? (
        <>
          <NavLink to="/">Home </NavLink>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          {/* //! switch between user and store login */}
          <NavLink to="/users/login">Login </NavLink>
          <NavLink to="/users/register">Register </NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;

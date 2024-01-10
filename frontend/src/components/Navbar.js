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
          <NavLink to="/products" /* reloadDocument */> Home ||</NavLink>
          <NavLink to="/carts"> Cart ||</NavLink>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          {/* //! switch between user and store login */}
          <NavLink to="/products"> Home ||</NavLink>
          <NavLink to="/users/login"> UserLogin ||</NavLink>
          <NavLink to="/users/register"> UserRegister ||</NavLink>
          <NavLink to="/stores/login"> StoreLogin ||</NavLink>
          <NavLink to="/stores/register"> StoreRegister</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;

import React, { useState, useContext } from "react";
import { appContext } from "../App";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [openBasic, setOpenBasic] = useState(false);
  const {
    isUserLoggedIn,
    userLocalStorage,
    setUserLocalStorage,
    search,
    setSearchParams,
  } = useContext(appContext);

  const logout = () => {
    setUserLocalStorage({ ...userLocalStorage, userToken: null });
    setUserLocalStorage({ ...userLocalStorage, isUserLoggedIn: false });
    localStorage.removeItem("userLocalStorage");
    navigate("/");
  };

  //* Search Bar
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <MDBNavbar expand="sm" light bgColor="light" className="sticky-top">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/products">K-shop</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 d-flex justify-content-end align-items-center">
            <MDBNavbarItem className="me-auto">
              <MDBNavbarLink href="/stores/login">Sell with us</MDBNavbarLink>
            </MDBNavbarItem>
            <form className="d-flex input-group w-auto" onSubmit={onSubmit}>
              <input
                type="search"
                className="form-control"
                placeholder="Search ..."
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  //* saving in SearchParams.
                  setSearchParams((prev) => {
                    prev.set("search", e.target.value);
                    return prev;
                  });
                }}
              />
            </form>
            {isUserLoggedIn ? (
              <>
                <MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle
                      tag="a"
                      className="nav-link"
                      role="button"
                    >
                      My Account
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link href="/users/:id">
                        Profile
                      </MDBDropdownItem>
                      <MDBDropdownItem link>
                        <div onClick={logout}>Logout</div>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink className="d-flex gap-1" href="/favs">
                    <i className="bi bi-heart"></i>
                    <label className="d-md-block d-sm-none d-block">Fav</label>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink className="d-flex gap-1" href="/carts">
                    <i className="bi bi-cart"></i>
                    <label className="d-md-block d-sm-none d-block">Cart</label>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/users/login">Login</MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink href="/users/register">Register</MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

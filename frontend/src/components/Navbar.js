import React, { useState, useContext /* useRef */ } from "react";
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
  // eslint-disable-next-line
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";

export default function Navbar() {
  const [openBasic, setOpenBasic] = useState(false);
  const {
    isUserLoggedIn,
    // setToken,
    // setIsUserLoggedIn,
    userLocalStorage,
    setUserLocalStorage,
    // eslint-disable-next-line
    products,
    // eslint-disable-next-line
    setProducts,
    search,
    setSearchParams,
  } = useContext(appContext);

  const logout = () => {
    // setToken(null);
    setUserLocalStorage({ ...userLocalStorage, token: null });
    // localStorage.removeItem("token");
    // setIsUserLoggedIn(false);
    setUserLocalStorage({ ...userLocalStorage, isUserLoggedIn: false });
    // localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("userLocalStorage");
  };

  //* Search Bar
  // const searchRef = useRef("");
  const onSubmit = (e) => {
    e.preventDefault();
    // const value = searchRef.current;
  };

  return (
    <MDBNavbar expand="sm" light bgColor="light">
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
            {/* <MDBNavbarItem className="flex-fill"> */}
            <MDBNavbarItem className="me-auto">
              <MDBNavbarLink href="/stores/login">Sell with us</MDBNavbarLink>
            </MDBNavbarItem>
            <form className="d-flex input-group w-auto" onSubmit={onSubmit}>
              <input
                type="search"
                className="form-control"
                placeholder="Search ..."
                aria-label="Search"
                // ref={searchRef}

                value={search}
                onChange={(e) => {
                  //* saving in SearchParams.
                  setSearchParams((prev) => {
                    prev.set("search", e.target.value);
                    return prev;
                  });
                }}
              />
              {/* <MDBBtn color="primary" type="submit">Search</MDBBtn> */}
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
                      <MDBDropdownItem link>Orders</MDBDropdownItem>
                      <MDBDropdownItem link href="/users/:id">
                        Profile
                      </MDBDropdownItem>
                      <MDBDropdownItem link /* href="/users/login" */>
                        <div onClick={logout}>Logout</div>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink className="d-flex gap-1" href="#">
                    <i className="bi bi-heart"></i>
                    <label className="d-md-block d-sm-none d-block">Fav</label>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink
                    active
                    aria-current="page"
                    className="d-flex gap-1"
                    href="/carts"
                  >
                    <i className="bi bi-cart"></i>
                    <label className="d-md-block d-sm-none d-block">Cart</label>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                {/* <MDBNavbarItem>
                  <MDBNavbarLink
                    disabled
                    href="#"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    Disabled
                  </MDBNavbarLink>
                </MDBNavbarItem> */}
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

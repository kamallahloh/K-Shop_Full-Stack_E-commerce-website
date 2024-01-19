import React, { useContext, useState } from "react";
import { appContext } from "../App";

const Footer = () => {
  const { buttonToggler, setButtonToggler } = useContext(appContext);
  const [textTruncate, setTextTruncate] = useState("text-truncate");

  return (
    <div>
      {/* <!-- Remove the container if you want to extend the Footer to full width. --> */}
      {/* <div className="container my-5"> */}
      {/* <!-- Footer --> */}
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#929fba" }}
      >
        {/* <!-- Grid container --> */}
        <div className="container p-4 pb-0">
          {/* <!-- Section: Links --> */}
          <section className="">
            {/* <!--Grid row--> */}
            <div className="row">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <div className="d-flex justify-content-center ">
                  <i className="fas fa-gem me-2 fw-light"></i>
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    K-Shop
                  </h6>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <strong>
                    We connect people and build communities to create economic
                    opportunity for all.
                  </strong>
                  <div className="w-75 d-flex align-items-end gap-2">
                    <p className={textTruncate}>
                      <br /> At K-shop, we create pathways to connect millions
                      of sellers and buyers in more than 190 markets around the
                      world. Our technology empowers our customers, providing
                      everyone the to grow and thrive — no matter who they are
                      or where they are in the world. And the ripple effect of
                      our work creates waves of change for our customers, our
                      company, our communities and our planet.
                    </p>
                    <button
                      id="show-more"
                      type="button"
                      className={
                        buttonToggler
                          ? "btn btn-outline-light btn-sm mb-3"
                          : "btn btn-outline-light btn-sm mb-3 d-none"
                      }
                      data-mdb-ripple-init
                      data-mdb-ripple-color="dark"
                      style={{ textTransform: "capitalize" }}
                      onClick={() => {
                        setTextTruncate("");
                        setButtonToggler(false);
                      }}
                    >
                      more
                    </button>
                    <button
                      id="show-less"
                      type="button "
                      className={
                        buttonToggler
                          ? "btn btn-outline-light btn-sm mb-3 d-none"
                          : "btn btn-outline-light btn-sm mb-3"
                      }
                      data-mdb-ripple-init
                      data-mdb-ripple-color="dark"
                      style={{ textTransform: "capitalize" }}
                      onClick={() => {
                        setTextTruncate("text-truncate");
                        setButtonToggler(true);
                      }}
                    >
                      Less
                    </button>
                  </div>
                </div>
              </div>
              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  USEFUL LINKS
                </h6>
                <p>
                  <a className="text-white">Home</a>
                </p>
                <p>
                  <a className="text-white">Orders</a>
                </p>
                <p>
                  <a className="text-white">Cart</a>
                </p>
                <p>
                  <a className="text-white">Sign Up</a>
                </p>
                <p>
                  <a className="text-white">Help</a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <hr className="w-100 clearfix d-md-none" />

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i> New York, NY 10012, US
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> info@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 234 567 89
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Follow us
                </h6>

                {/* <!-- Facebook --> */}
                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>

                {/* <!-- Twitter --> */}
                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter"></i>
                </a>

                {/* <!-- Google --> */}
                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#dd4b39" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-google"></i>
                </a>

                {/* <!-- Instagram --> */}
                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#ac2bac" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                {/* <!-- Linkedin --> */}
                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#0082ca" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                {/* <!-- Github --> */}
                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#333333" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            {/* <!--Grid row--> */}
          </section>
          {/* <!-- Section: Links --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          K-Shop E-Commerce Company © 2024 Copyright: k-shop.com
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
      {/* </div> */}
      {/* <!-- End of .container --> */}
    </div>
  );
};

export default Footer;

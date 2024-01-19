import React, { useContext, useState } from "react";
import { appContext } from "../App";

const Footer = () => {
  const { buttonToggler, setButtonToggler } = useContext(appContext);
  const [textTruncate, setTextTruncate] = useState("text-truncate");

  return (
    <div>
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#929fba" }}
      >
        <div className="container pt-4 pb-0 ">
          <section className="">
            <div className="row">
              <div className="col-md-3 col-lg-4 mx-auto mt-3 mb-3">
                <div className="d-flex justify-content-center">
                  <i className="fas fa-gem me-2 fw-light"></i>
                  <h6 className="text-uppercase mb-4 font-weight-bold">
                    K-Shop
                  </h6>
                </div>
                <div className="d-flex flex-column align-items-center">
                  We connect people and build communities to create economic
                  opportunity for all.
                </div>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-3 col-lg-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  USEFUL LINKS
                </h6>
                <p>
                  <a className="text-white" href="/carts">
                    Cart
                  </a>
                </p>
                <p>
                  <a className="text-white" href="/users/register">
                    Sign Up Now
                  </a>
                </p>
                <p>
                  <a className="text-white" href="/stores/register">
                    Sell with us
                  </a>
                </p>
                <p>
                  <a className="text-white">Help</a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-4 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i> Zarqa, ZW 12345, JORDAN
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> info@k-shop.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 962 234 567 88
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 962 234 567 89
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 mx-auto my-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Follow us
                </h6>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                  role="button"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                  target="_blank"
                >
                  <i className="fab fa-twitter"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#dd4b39" }}
                  href="#!"
                  role="button"
                  target="_blank"
                >
                  <i className="fab fa-google"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#ac2bac" }}
                  href="#!"
                  role="button"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#0082ca" }}
                  href="#!"
                  role="button"
                  target="_blank"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  className="btn btn-primary btn-floating m-1"
                  style={{ backgroundColor: "#333333" }}
                  href="https://github.com/C9-kamallahloh/"
                  role="button"
                  target="_blank"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          K-Shop E-Commerce Company © 2024 Copyright: k-shop.com
        </div>
      </footer>
    </div>
  );
};

export default Footer;

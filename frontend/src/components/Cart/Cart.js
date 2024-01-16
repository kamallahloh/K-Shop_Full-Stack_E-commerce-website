import "./style.css";

import React from "react";

const Cart = () => {
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">1 item/s</h6>
                      </div>
                      <hr className="my-4" />

                      <div className="row mb-4 d-flex justify-content-between align-items-center">
                        <div className="col-sm-2 col-lg-2 col-xl-2">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                            className="img-fluid rounded-3"
                            alt="Cotton T-shirt"
                          />
                        </div>
                        <div className="col-sm-3 col-lg-3 col-xl-3">
                          <h6 className="text-muted">Shirt</h6>
                          <h6 className="text-black mb-0">Cotton T-shirt</h6>
                        </div>
                        <div className="col-sm-4 col-lg-3 col-xl-2 d-flex">
                          <button
                            className="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <input
                            id="form1"
                            min="0"
                            name="quantity"
                            value="1"
                            type="number"
                            className="form-control form-control-sm"
                          />

                          <button
                            className="btn btn-link px-2"
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="col-sm-2 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 className="mb-0">€ 44.00</h6>
                        </div>
                        <div className="col-sm-1 col-lg-1 col-xl-1 text-end">
                          <a href="#!" className="text-muted">
                            <i className="fas fa-times"></i>
                          </a>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a href="#!" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">items Total</h5>
                        <h5>€ 132.00</h5>
                      </div>

                      <h5 className="text-uppercase mb-3">Shipping</h5>

                      <div className="mb-4 pb-2">
                        <select className="select">
                          <option value="1">Standard-Delivery- €5.00</option>
                          <option value="3">Express-Delivery- €15.00</option>
                          <option value="4">Same Day-Delivery- €45.00</option>
                        </select>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>€ 137.00</h5>
                      </div>

                      <button
                        type="button"
                        className="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

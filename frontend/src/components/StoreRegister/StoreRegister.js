import "../style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function StoreRegister() {
  const navigate = useNavigate();

  const [storeData, setStoreData] = useState({
    storeName: "",
    country: "",
    email: "",
    phoneNumber: 0,
    password: "",
    products: [],
    // role: "6599b4f1ae021f180dd74d76", //! testing store role this will be added in the backend
  });

  const [successfulStoreRegister, setSuccessfulStoreRegister] = useState("");

  const submitNewStore = () => {
    console.table(storeData);

    axios
      .post("http://localhost:5000/stores/register", storeData)
      .then((result) => {
        console.log(result.data.message);
        setSuccessfulStoreRegister(result.data.message);

        setTimeout(() => {
          navigate("/stores/login");
          console.log(successfulStoreRegister);
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setSuccessfulStoreRegister(error.response.data.message);
      });
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"

    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard
        className="m-5"
        style={{
          width: "75%",
          maxWidth: "600px",
        }}
      >
        <MDBCardBody className="px-5">
          <h2 className="text-center mb-5">open new STORE</h2>
          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Store Name"
            size="lg"
            id="storeName"
            type="text"
            onChange={(e) => {
              setStoreData({ ...storeData, storeName: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Country"
            size="lg"
            id="country"
            type="text"
            onChange={(e) => {
              setStoreData({ ...storeData, country: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-12"
            label="Your Email"
            size="lg"
            id="email"
            type="email"
            onChange={(e) => {
              setStoreData({ ...storeData, email: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Phone Number"
            size="lg"
            id="phoneNumber"
            type="tel"
            onChange={(e) => {
              setStoreData({ ...storeData, phoneNumber: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Password"
            size="lg"
            id="password"
            type="password"
            onChange={(e) => {
              setStoreData({ ...storeData, password: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Repeat your password"
            size="lg"
            id="re-password"
            type="password"
            // onChange={(e) => {
            //   setStoreData({ ...storeData, password: e.target.value });
            // }}
          />

          <div className="d-flex flex-row justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="checkTOS"
              label="I agree all statements in Terms of service"
            />
          </div>

          <MDBBtn
            id="mdb-btn"
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={submitNewStore}
          >
            Register
          </MDBBtn>
          <p>
            Already selling with us? <a href="/stores/login">Login</a>
          </p>
          {successfulStoreRegister && (
            <p className="text-success">{successfulStoreRegister}</p>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default StoreRegister;

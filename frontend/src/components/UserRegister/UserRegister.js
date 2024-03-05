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
  // eslint-disable-next-line
  MDBSelect,
} from "mdb-react-ui-kit";

function UserRegister() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    age: 0,
    country: "",
    email: "",
    userCart: [],
    userFav: [],
    password: "",
    // role: "6599b50fae021f180dd74d78", //! testing user role this will be added in the backend
  });

  const [successfulUserRegister, setSuccessfulUserRegister] = useState("");

  const submitNewUser = () => {
    console.table(userData);

    axios
      .post("https://k-shop-full-stack-e-commerce-website.onrender.com/users/register", userData)
      .then((result) => {
        console.log(result.data.message);
        setSuccessfulUserRegister(result.data.message);

        setTimeout(() => {
          navigate("/users/login");
          console.log(successfulUserRegister);
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setSuccessfulUserRegister(error.response.data.message);
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
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="First Name"
            size="lg"
            id="firstName"
            type="text"
            onChange={(e) => {
              setUserData({ ...userData, firstName: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Last Name"
            size="lg"
            id="lastName"
            type="text"
            onChange={(e) => {
              setUserData({ ...userData, lastName: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Phone Number"
            size="lg"
            id="phoneNumber"
            type="tel"
            onChange={(e) => {
              setUserData({ ...userData, phoneNumber: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Age"
            size="lg"
            id="age"
            type="number"
            onChange={(e) => {
              setUserData({ ...userData, age: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Country"
            size="lg"
            id="country"
            type="text"
            onChange={(e) => {
              setUserData({ ...userData, country: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="User Name"
            size="lg"
            id="userName"
            type="text"
            onChange={(e) => {
              setUserData({ ...userData, userName: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-12"
            label="Your Email"
            size="lg"
            id="email"
            type="email"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Password"
            size="lg"
            id="password"
            type="password"
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Repeat your password"
            size="lg"
            id="re-password"
            type="password"
            // onChange={(e) => {
            //   setUserData({ ...userData, password: e.target.value });
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
            onClick={submitNewUser}
          >
            Register
          </MDBBtn>

          <p>
            Already have an account? <a href="/users/login">Login</a>
          </p>
          {successfulUserRegister && (
            <p className="text-success">{successfulUserRegister}</p>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default UserRegister;

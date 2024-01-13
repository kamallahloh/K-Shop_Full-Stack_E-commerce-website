import "../UserRegister/UserRegisterStyle.css";
import React from "react";
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
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
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
          />
          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Last Name"
            size="lg"
            id="lastName"
            type="text"
          />
          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Phone Number"
            size="lg"
            id="phoneNumber"
            type="tel"
          />
          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Age"
            size="lg"
            id="age"
            type="number"
          />
          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Country"
            size="lg"
            id="country"
            type="text"
          />
          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="User Name"
            size="lg"
            id="userName"
            type="text"
          />
          <MDBInput
            wrapperClass="mb-4 col-md-12"
            label="Your Email"
            size="lg"
            id="email"
            type="email"
          />

          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Password"
            size="lg"
            id="password"
            type="password"
          />
          <MDBInput
            wrapperClass="mb-4 col-md-6"
            label="Repeat your password"
            size="lg"
            id="re-password"
            type="password"
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
          >
            Register
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default UserRegister;

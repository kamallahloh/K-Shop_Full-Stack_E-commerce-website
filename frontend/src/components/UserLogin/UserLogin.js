import "../style.css";
import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function UserLogin() {
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

      <MDBCard className="m-5" style={{ width: "75%", maxWidth: "500px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">user Login</h2>
          <MDBInput
            wrapperClass="mb-4"
            label="Enter Your Email"
            size="lg"
            id="email"
            type="email"
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="password"
            type="password"
          />
          {/* <div className="d-flex flex-row justify-content-center mb-4"> */}
          <div className="mb-4">
            <MDBCheckbox name="flexCheck" id="stay-login" label="Stay Login" />
          </div>
          <MDBBtn
            id="mdb-btn"
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
          >
            Login
          </MDBBtn>
          <p>
            Don't have an account? <a href="/users/register">Register Now</a>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default UserLogin;

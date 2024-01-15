import "../style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import React, { useContext, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { appContext } from "../../App";

function UserLogin() {
  const navigate = useNavigate();

  const { userLocalStorage, setUserLocalStorage } = useContext(appContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [successfulUserLogin, setSuccessfulUserLogin] = useState("");

  const LoginButtonOnClick = () => {
    axios
      .post("http://localhost:5000/users/login", loginData)
      .then((result) => {
        console.log(result.data.message);
        setSuccessfulUserLogin(result.data.message);

        setUserLocalStorage(
          JSON.stringify({
            ...userLocalStorage,
            token: result.data.token,
            isUserLoggedIn: true,
          })
        );
        localStorage.setItem(
          "userLocalStorage",
          JSON.stringify({
            ...userLocalStorage,
            token: result.data.token,
            isUserLoggedIn: true,
          })
        );

        setTimeout(() => {
          navigate("/");
          console.log(successfulUserLogin);
          window.location.reload(true);
        }, 2000);
      })

      .catch((error) => {
        console.log(error.response.data.message);
        setSuccessfulUserLogin(error.response.data.message);
      });
  };

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
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="password"
            type="password"
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
          {/* <div className="d-flex flex-row justify-content-center mb-4"> */}
          <div className="mb-4">
            <MDBCheckbox name="flexCheck" id="stay-login" label="Stay Login" />
          </div>
          <MDBBtn
            id="mdb-btn"
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            onClick={LoginButtonOnClick}
          >
            Login
          </MDBBtn>
          <p>
            Don't have an account? <a href="/users/register">Register Now</a>
          </p>
          {successfulUserLogin && (
            <p className="text-success">{successfulUserLogin}</p>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default UserLogin;

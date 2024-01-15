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

function StoreLogin() {
  const navigate = useNavigate();

  const { storeLocalStorage, setStoreLocalStorage } = useContext(appContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [successfulLogin, setSuccessfulLogin] = useState("");

  const LoginButtonOnClick = () => {
    axios
      .post("http://localhost:5000/stores/login", loginData)
      .then((result) => {
        console.log(result.data.message);
        setSuccessfulLogin(result.data.message);

        setStoreLocalStorage(
          JSON.stringify({
            ...storeLocalStorage,
            storeToken: result.data.token,
            isStoreLoggedIn: true,
          })
        );
        localStorage.setItem(
          "storeLocalStorage",
          JSON.stringify({
            ...storeLocalStorage,
            storeToken: result.data.token,
            isStoreLoggedIn: true,
          })
        );

        setTimeout(() => {
          navigate(`/stores/${result.data.storeId}`);
          console.log(successfulLogin);
          window.location.reload(true);
        }, 2000);
      })

      .catch((error) => {
        console.log(error.response.data.message);
        setSuccessfulLogin(error.response.data.message);
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
          <h2 className="text-uppercase text-center mb-5">store Login</h2>
          <MDBInput
            wrapperClass="mb-4"
            label="Enter Store Email"
            size="lg"
            id="email"
            type="email"
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Store Password"
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
            Start selling with us <a href="/stores/register">Register Now</a>
          </p>
          {successfulLogin && <p className="text-success">{successfulLogin}</p>}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default StoreLogin;

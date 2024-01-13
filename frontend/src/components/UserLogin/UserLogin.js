// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// // import Row from "react-bootstrap/Row";
// // import Col from "react-bootstrap/Col";

// function UserLogin() {
//   return (
//     <Container className="col-10 col-sm-8 col-md-6 col-lg-4 col-lx-2">
//       <Form className="user-login">
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control type="email" placeholder="Enter email" />
//           <Form.Text className="text-muted">
//             We'll never share your email with anyone else.
//           </Form.Text>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" placeholder="Password" />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBasicCheckbox">
//           <Form.Check type="checkbox" label="Stay Login" />
//         </Form.Group>
//         {/* <Container className="justify-content-center"> */}
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//         {/* </Container> */}
//       </Form>
//     </Container>
//   );
// }

// export default UserLogin;

//* /////////////////////////////////////////////////////////
//* /////////////////////////////////////////////////////////
//* /////////////////////////////////////////////////////////
//* /////////////////////////////////////////////////////////

// import React from "react";
// import { Container, Row, Col, Button, Form } from "react-bootstrap";

// const UserLogin = () => {
//   return (
//     <div className="user-login">
//       <Container className="col-4-md">
//         <Form>
//           <Form.Group controlId="email">
//             <Row>
//               <Col className="col-3">
//                 <Form.Label>Email</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control type="email" placeholder="enter your Email" />
//                 {/* <Form.Text className="text-muted">enter your Email</Form.Text> */}
//               </Col>
//             </Row>
//           </Form.Group>
//           <Form.Group className="mt-2" controlId="password">
//             <Row>
//               <Col className="col-3">
//                 <Form.Label>Password</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   type="password"
//                   placeholder="enter your Password"
//                 />
//               </Col>
//             </Row>
//           </Form.Group>
//           <Button className="mt-2" variant="primary" type="submit">
//             Login
//           </Button>
//         </Form>
//       </Container>
//     </div>
//   );
// };

// export default UserLogin;

//* /////////////////////////////////////////////////////////
//* /////////////////////////////////////////////////////////
//* /////////////////////////////////////////////////////////
//* /////////////////////////////////////////////////////////

import "../UserRegister/UserRegisterStyle.css";
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
          <h2 className="text-uppercase text-center mb-5">Login</h2>
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
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default UserLogin;

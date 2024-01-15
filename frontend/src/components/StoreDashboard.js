import "./style.css";
import axios from "axios";
import React, { useContext, useState } from "react";

import {
  // MDBFile,
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { appContext } from "../App";

const StoreDashboard = () => {
  const { storeToken } = useContext(appContext);

  //? addProduct ///////////////////////////////
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    images: [],
    categories: [],
    price: 0,
    // store: "65a2f6c627591f2f7b7d8f86" //!  store role this will be added in the backend (req.token.storeId)
  });

  const [successfulAddProduct, setSuccessfulAddProduct] = useState("");

  const addProductButtonOnClick = () => {
    // console.table(productData);
    axios
      .post("http://localhost:5000/products", productData, {
        headers: {
          authorization: `Bearer ${storeToken}`,
        },
      })
      .then((result) => {
        console.log(result.data.message);
        setSuccessfulAddProduct(result.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setSuccessfulAddProduct(error.response.data.message);
      });
  };

  return (
    <div className="StoreDashboard">
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
            <h2 className="text-uppercase text-center mb-3">Add Product</h2>

            <MDBInput
              wrapperClass="mb-4"
              label="Product Name"
              size="lg"
              id="productName"
              type="productName"
              onChange={(e) => {
                setProductData({ ...productData, productName: e.target.value });
              }}
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Description"
              size="lg"
              id="description"
              type="description"
              onChange={(e) => {
                setProductData({ ...productData, description: e.target.value });
              }}
            />

            {/* <div>
              <MDBFile label="Images" id="images" multiple />
            </div>
            <br /> */}

            <MDBInput
              wrapperClass="mb-4"
              label="Categories"
              size="lg"
              id="categories"
              type="categories"
              onChange={(e) => {
                setProductData({ ...productData, categories: e.target.value });
              }}
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Price"
              size="lg"
              id="price"
              type="price"
              onChange={(e) => {
                setProductData({ ...productData, price: e.target.value });
              }}
            />

            <MDBBtn
              id="mdb-btn"
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
              onClick={addProductButtonOnClick}
            >
              Add Product
            </MDBBtn>

            {successfulAddProduct && (
              <p className="text-success">{successfulAddProduct}</p>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default StoreDashboard;

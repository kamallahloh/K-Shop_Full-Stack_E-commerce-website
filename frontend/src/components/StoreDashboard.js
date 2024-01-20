import "./style.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../App";
import { useParams } from "react-router-dom";

import {
  MDBFile,
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const StoreDashboard = () => {
  const {
    userToken,
    //
    storeToken,
    //
    setProducts,
    searchedProducts,
    //
    // successfullyDeleteProductById,
    setSuccessfullyDeleteProductById,
    //
    successfullyAddedToCart,
    setSuccessfullyAddedToCart,
    addedCartProductId,
    setAddedCartProductId,
    //
    successfullyAddedToFav,
    setSuccessfullyAddedToFav,
    addedFavProductId,
    setAddedFavProductId,
    //
    image,
    setImage,
    setUrl,
  } = useContext(appContext);

  const { id } = useParams();

  //* get Products By Store Id //////////////////

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((results) => {
        setProducts(results.data.products);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setProducts(<>{error.response.data.message}</>);
      });
  }, [setProducts]);

  const newProductsByStore = searchedProducts.filter((product) => {
    return product.store === id;
  });
  // console.log('searchedProducts', searchedProducts)
  // console.log("newProductsByStore", newProductsByStore);

  // const getProductsByStore = () => {
  //   axios
  //     .get(`http://localhost:5000/products/products_by_store?store=${id}`)
  //     .then((result) => {
  //       setProducts(result.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(getProductsByStore, []);

  //! addProduct MODAL start ///////////////////////////////

  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);

  //! addProduct MODAL end ///////////////////////////////

  //! addProduct ///////////////////////////////

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
    axios
      .post("http://localhost:5000/products", productData, {
        headers: {
          authorization: `Bearer ${storeToken}`,
        },
      })
      .then((result) => {
        //* add the product to the state holds it in store page
        // console.table(searchedProducts);
        productData.store = id;
        productData.key = id;
        searchedProducts.unshift(productData);
        const reversedSearchedProducts = [...searchedProducts].reverse();
        setProducts(reversedSearchedProducts);

        //
        console.log(result.data.message);
        setSuccessfulAddProduct(result.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setSuccessfulAddProduct(error.response.data.message);
      });
  };

  //* Upload Images to Cloudinary //////////////////////////
  const [successfulImageUpload, setSuccessfulImageUpload] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "imageToCloud");
    data.append("cloud_name", "dpbh42kjy");

    axios
      .post("https://api.cloudinary.com/v1_1/dpbh42kjy/image/upload", data)
      .then((data) => {
        setUrl(data.data.url);
        setProductData({ ...productData, images: [data.data.url] });
        console.log(`uploaded image url"${data.data.url}"`);
        setSuccessfulImageUpload("Image uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
        setSuccessfulImageUpload("Image failed to upload");
      });
  };

  //? deleteProductById ///////////////////////////////

  const deleteProductByIdOnClick = (e, ProductId) => {
    axios
      .delete(`http://localhost:5000/products/${ProductId}`, {
        headers: {
          authorization: `Bearer ${storeToken}`,
        },
      })
      .then((result) => {
        console.log(
          `Product: (${result.data.product.productName}) has been deleted permanently`
        );
        setSuccessfullyDeleteProductById(
          `Product: (${result.data.product.productName}) has been deleted permanently`
        );

        //* delete the product from the state holds it in store page
        const newProducts = searchedProducts.reverse().filter((item, i) => {
          return ProductId !== item._id;
        });
        setProducts(newProducts);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setSuccessfullyDeleteProductById(error.response.data.message);
      });
  };

  //* addToCartOnClick ////////////////////////////

  const addToCartOnClick = (e, productId) => {
    //* addToCart ///////////////////////
    axios
      .post(
        `http://localhost:5000/carts/${productId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((result) => {
        console.log(
          // `item: ( ${result.data.product.productName} ) has been added to the Cart`
          `item: ( ${productId} ) has been added to the Cart`
        );
        setAddedCartProductId(productId);
        setSuccessfullyAddedToCart("Successfully Added to Cart");
        setTimeout(() => {
          setSuccessfullyAddedToCart("");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setAddedCartProductId(productId);
        setSuccessfullyAddedToCart(
          // error.response.data.message
          "Please first "
        );
        setTimeout(() => {
          setSuccessfullyAddedToCart("");
        }, 6000);
      });
  };

  //* addToFavOnClick ////////////////////////////

  const addToFavOnClick = (e, productId) => {
    //* addToFav ///////////////////////
    axios
      .post(
        `http://localhost:5000/favs/${productId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((result) => {
        console.log(`item: ( ${productId} ) has been added to the Fav`);
        setAddedFavProductId(productId);
        setSuccessfullyAddedToFav("Successfully Added to Fav");
        setTimeout(() => {
          setSuccessfullyAddedToFav("");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setAddedFavProductId(productId);
        setSuccessfullyAddedToFav(
          // error.response.data.message
          "Please first "
        );
        setTimeout(() => {
          setSuccessfullyAddedToFav("");
        }, 6000);
      });
  };

  return (
    <div className="StoreDashboard position-relative">
      <>
        <div className="m-4 position-fixed sticky-top">
          <MDBBtn
            onClick={toggleOpen}
            className="mt-5  gradient-custom-4 "
            size="lg"
          >
            Add New Product
          </MDBBtn>
        </div>
        <MDBContainer
          fluid
          className="d-flex align-items-center justify-content-center bg-image"
        >
          <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle className="text-uppercase">
                    Add Product
                  </MDBModalTitle>
                  {successfulAddProduct && (
                    <p className="text-success mx-auto pt-3">
                      {successfulAddProduct}
                    </p>
                  )}
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleOpen}
                  ></MDBBtn>
                </MDBModalHeader>

                <MDBModalBody>
                  <div className="mask gradient-custom-3"></div>

                  <MDBCard>
                    <MDBCardBody className="px-3">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Product Name"
                        size="lg"
                        id="productName"
                        type="productName"
                        onChange={(e) => {
                          setProductData({
                            ...productData,
                            productName: e.target.value,
                          });
                        }}
                      />

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Description"
                        size="lg"
                        id="description"
                        type="description"
                        onChange={(e) => {
                          setProductData({
                            ...productData,
                            description: e.target.value,
                          });
                        }}
                      />

                      <div>
                        <div className="d-flex align-items-center justify-content-center gap-1">
                          <MDBFile
                            label="Image"
                            id="image"
                            // multiple
                            size="sm"
                            onChange={(e) => setImage(e.target.files[0])}
                          />

                          <button
                            id="mdb-btn"
                            className="gradient-custom-4"
                            size="sx"
                            onClick={uploadImage}
                          >
                            Upload
                          </button>
                        </div>
                        {successfulImageUpload ? (
                          <p className="text-success">
                            {successfulImageUpload}
                          </p>
                        ) : (
                          <p>upload image first</p>
                        )}
                      </div>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Categories"
                        size="lg"
                        id="categories"
                        type="categories"
                        onChange={(e) => {
                          setProductData({
                            ...productData,
                            categories: e.target.value,
                          });
                        }}
                      />

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Price"
                        size="lg"
                        id="price"
                        type="price"
                        onChange={(e) => {
                          setProductData({
                            ...productData,
                            price: e.target.value,
                          });
                        }}
                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn
                    id="mdb-btn"
                    className="mb-4 w-100 gradient-custom-4"
                    size="lg"
                    onClick={(e) => {
                      addProductButtonOnClick(e);

                      setTimeout(() => {
                        toggleOpen(e);
                      }, 2000);
                    }}
                  >
                    Add Product
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </MDBContainer>
      </>

      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}
      {/* //////////////////////////////////////////////// */}

      <section className="products">
        {newProductsByStore ? (
          Array.isArray(newProductsByStore) && newProductsByStore.length > 0 ? (
            <>
              <div className="text-center container py-5">
                <h4 className="mt-2 mb-2">
                  <strong>Products</strong>
                </h4>

                {/* flex-wrap-reverse flex-row-reverse ==> new added product will be on top of the page */}
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                  {newProductsByStore.map((product) => {
                    return (
                      <div
                        className="product-card col-xl-3 col-lg-4 col-md-6 col-sm-8 col-9 m-3 p-2 border border-1 border-secondary rounded-9 "
                        key={product._id}
                        id={product._id}
                      >
                        <div className="bg-image mb-2">
                          <img
                            src={product.images[0]}
                            className="w-100 rounded-7 z-n1"
                            alt={product.productName}
                          />
                          <a href="#!" className="rounded-9">
                            <div className="mask">
                              <div
                                className="d-flex justify-content-start align-items-end h-100"
                                style={{ position: "relative", zIndex: "1" }}
                              >
                                <h5
                                  onClick={(e) => {
                                    addToFavOnClick(e, product._id);
                                  }}
                                >
                                  <span className="badge bg-danger ms-2 rounded-3">
                                    <i className="bi bi-heart z-1"></i>
                                  </span>
                                </h5>
                              </div>
                            </div>
                            <div className="mask">
                              <div
                                className="d-flex justify-content-end align-items-start m-2"
                                style={{ position: "relative", zIndex: "1" }}
                              >
                                {/* deleteProductByIdOnClick ////// */}
                                <h6
                                  onClick={(e) => {
                                    deleteProductByIdOnClick(e, product._id);
                                  }}
                                >
                                  <span className="badge bg-white text-danger">
                                    <i className="fas fa-x"></i>
                                  </span>
                                </h6>
                              </div>
                            </div>
                            <div className="hover-overlay">
                              <div className="mask"></div>
                            </div>
                          </a>
                        </div>
                        <div className="card-body">
                          <a href="#!">
                            <h5 className="card-title mb-3">
                              {product.productName}
                            </h5>
                          </a>
                          {/* <a href="#!" className="text-reset">
                          <p>{product.categories.name}</p>
                        </a> */}
                          <p className="text-truncate mx-3">
                            {product.description}
                          </p>
                          <div className="d-flex justify-content-between align-items-center px-3 text-success">
                            <div className="mb-1">
                              Price <h4>${~~(product.price * 100) / 100} </h4>
                            </div>

                            <button
                              className="btn btn-outline-primary"
                              type="button"
                              onClick={(e) => {
                                addToCartOnClick(e, product._id);
                              }}
                            >
                              Add To Cart <MDBIcon fas icon="cart-plus" />
                            </button>
                          </div>
                          {product._id === addedCartProductId && (
                            <div className="text-danger position-fixed top-0 end-0 mt-5 pt-3 me-3">
                              {successfullyAddedToCart}
                              {successfullyAddedToCart === "Please first " && (
                                <a href="/users/login">Login</a>
                              )}
                            </div>
                          )}

                          {product._id === addedFavProductId && (
                            <div className="text-danger position-fixed top-0 end-0 mt-5 pt-5 me-3">
                              {successfullyAddedToFav}
                              {successfullyAddedToFav === "Please first " && (
                                <a href="/users/login">Login</a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div>{newProductsByStore} No Products Yet</div>
          )
        ) : (
          <div>No Products Yet </div>
        )}
      </section>
    </div>
  );
};

export default StoreDashboard;

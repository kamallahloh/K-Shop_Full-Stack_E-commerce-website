import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { appContext } from "../App";

import {
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const Products = () => {
  const {
    userToken,
    setProducts,
    searchedProducts,
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
  } = useContext(appContext);

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
        console.log(`item: ( ${productId} ) has been added to the Cart`);
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
      });
  };

  //* Product details MODAL ///////////////////////////////

  const [fullscreenXlModal, setFullscreenXlModal] = useState(false);

  const toggleOpen = () => setFullscreenXlModal(!fullscreenXlModal);

  return (
    <section className="products">
      {searchedProducts ? (
        Array.isArray(searchedProducts) && searchedProducts.length > 0 ? (
          <>
            <div className="text-center container py-5">
              <h4 className="mt-2 mb-2">
                <strong>Products</strong>
              </h4>

              {/* flex-wrap-reverse flex-row-reverse ==> new added product will be on top of the page */}
              <div className="d-flex flex-wrap align-items-center justify-content-center">
                {searchedProducts.map((product) => {
                  return (
                    <div
                      className="product-card col-xl-3 col-lg-4 col-md-6 col-sm-8 col-9 m-3 p-2 border border-1 border-secondary rounded-9"
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
                            <div className="d-flex justify-content-start align-items-end h-100">
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
                        </a>
                      </div>
                      <div className="card-body">
                        <div className="product-details">
                          <MDBModal
                            tabIndex="-1"
                            open={fullscreenXlModal}
                            setOpen={setFullscreenXlModal}
                          >
                            <MDBModalDialog size="fullscreen">
                              <MDBModalContent>
                                <MDBModalHeader>
                                  <MDBModalTitle>
                                    {product.productName}
                                  </MDBModalTitle>
                                  <MDBBtn
                                    className="btn-close"
                                    color="none"
                                    onClick={toggleOpen}
                                  ></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                  <div>
                                    <aside>
                                      <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                        <img
                                          // style={{
                                          //   maxWidth: "100%",
                                          //   maxHeight: "100vh",
                                          //   margin: "auto",
                                          // }}
                                          width="200"
                                          height="200"
                                          className="rounded-4"
                                          src={product.images[0]}
                                          alt={product.productName}
                                        />
                                      </div>
                                      <div className="d-flex justify-content-center mb-3 gap-2">
                                        {product.images.map((image, i) => {
                                          if (i > 0) {
                                            return (
                                              <img
                                                key={image}
                                                width="60"
                                                height="60"
                                                className="rounded-2"
                                                src={image}
                                                alt={product.productName}
                                              />
                                            );
                                          }
                                        })}
                                      </div>
                                    </aside>
                                    <main>
                                      <div className="ps-lg-3">
                                        <div className="d-flex flex-row my-3">
                                          <span className="text-muted">
                                            <i className="fas fa-shopping-basket fa-sm mx-1"></i>
                                            {Math.ceil(Math.random() * 1000)}{" "}
                                            orders
                                          </span>
                                          <span className="text-success ms-2">
                                            In stock
                                          </span>
                                        </div>

                                        <div className="mb-3">
                                          <span className="h5">
                                            ${~~(product.price * 100) / 100}
                                          </span>
                                          <span className="text-muted">
                                            /per Item
                                          </span>
                                        </div>

                                        <p>{product.description}</p>

                                        <div className="row">
                                          <dt className="col-3">Type:</dt>
                                          <dd className="col-9">Regular</dd>

                                          <dt className="col-3">Color</dt>
                                          <dd className="col-9">Black</dd>

                                          <dt className="col-3">Category</dt>
                                          <dd className="col-9">Clothes</dd>
                                        </div>
                                      </div>
                                    </main>
                                  </div>
                                </MDBModalBody>
                                <MDBModalFooter>
                                  <div className="d-flex flex-column text-danger mx-auto h6 small ">
                                    <div>
                                      {successfullyAddedToCart}
                                      {successfullyAddedToCart ===
                                        "Please first " && (
                                        <a href="/users/login">Login</a>
                                      )}
                                    </div>

                                    <div>
                                      {successfullyAddedToFav}
                                      {successfullyAddedToFav ===
                                        "Please first " && (
                                        <a href="/users/login">Login</a>
                                      )}
                                    </div>
                                  </div>
                                  <MDBBtn
                                    color="danger"
                                    onClick={(e) => {
                                      addToFavOnClick(e, product._id);
                                    }}
                                    className="gap-1"
                                  >
                                    add to Fav{" "}
                                    <i className="bi bi-heart z-1"></i>
                                  </MDBBtn>
                                  <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={(e) => {
                                      addToCartOnClick(e, product._id);
                                    }}
                                  >
                                    Add To Cart <MDBIcon fas icon="cart-plus" />
                                  </button>
                                </MDBModalFooter>
                              </MDBModalContent>
                            </MDBModalDialog>
                          </MDBModal>
                        </div>
                        <a href="#!" onClick={toggleOpen}>
                          <h5 className="card-title mb-3">
                            {product.productName}
                          </h5>
                        </a>
                        {/* <a href="#!" className="text-reset">
                          <p>{product.categories?.name}</p>
                        </a> */}
                        <p className="text-truncate mx-3">
                          {product.description}
                        </p>
                        <div className="d-flex justify-content-between align-items-center px-3 text-success">
                          <div>
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
          <div>{searchedProducts}</div>
        )
      ) : (
        <div>No Products Yet</div>
      )}
    </section>
  );
};

export default Products;

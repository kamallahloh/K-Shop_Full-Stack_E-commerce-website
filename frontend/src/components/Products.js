import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { appContext } from "../App";
import { MDBIcon } from "mdb-react-ui-kit";

const Products = () => {
  const { userToken, setProducts, searchedProducts } = useContext(appContext);

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

  //* addToCart /////////////////////
  const [successfullyAddedToCart, setSuccessfullyAddedToCart] = useState("");
  const [addedProductId, setAddedProductId] = useState(0);

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
                      className="product-card col-xl-3 col-lg-4 col-md-6 col-sm-8 col-9 m-3 p-2 border border-1 border-secondary rounded-9 "
                      key={product._id}
                      id={product._id}
                    >
                      <div className="bg-image mb-2">
                        <img
                          src={product.images[0]}
                          className="w-100 rounded-7"
                          alt={product.productName}
                        />
                        <a href="#!" className="rounded-9">
                          <div className="mask">
                            <div className="d-flex justify-content-start align-items-end h-100">
                              <h5>
                                <span className="badge bg-danger ms-2 rounded-3">
                                  <i className="bi bi-heart"></i>
                                </span>
                              </h5>
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
                            onClick={() => {
                              //* addToCart ///////////////////////
                              axios
                                .post(
                                  `http://localhost:5000/carts/${product._id}`,
                                  {},
                                  {
                                    headers: {
                                      authorization: `Bearer ${userToken}`,
                                    },
                                  }
                                )
                                .then((result) => {
                                  console.log(
                                    `item: ( ${product.productName} ) has been added to the cart`
                                  );
                                  setAddedProductId(product._id);
                                  setSuccessfullyAddedToCart(
                                    "Successfully Added to Cart"
                                  );
                                  setTimeout(() => {
                                    setSuccessfullyAddedToCart("");
                                  }, 3000);
                                })
                                .catch((error) => {
                                  console.log(error);
                                  setAddedProductId(product._id);
                                  setSuccessfullyAddedToCart(
                                    // error.response.data.message
                                    "Please first "
                                  );
                                });
                            }}
                          >
                            Add To Cart <MDBIcon fas icon="cart-plus" />
                          </button>
                        </div>
                        {product._id === addedProductId &&
                        successfullyAddedToCart ? (
                          <div className="text-danger">
                            {successfullyAddedToCart}
                            {successfullyAddedToCart === "Please first " && (
                              <a href="/users/login">Login</a>
                            )}
                          </div>
                        ) : (
                          <div className="m-4"></div>
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

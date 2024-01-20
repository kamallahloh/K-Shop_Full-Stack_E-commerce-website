import axios from "axios";
import React, { useEffect, useContext /* useState */ } from "react";
import { appContext } from "../App";
import { MDBIcon } from "mdb-react-ui-kit";

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

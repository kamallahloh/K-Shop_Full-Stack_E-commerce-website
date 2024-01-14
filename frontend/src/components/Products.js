// import axios from "axios";
import React, { /* useEffect ,*/ useContext } from "react";
import { appContext } from "../App";

const Products = () => {
  const {
    // token,
    // loggedInUserId,
    products,
    // setProducts,
    // isLoggedIn,
    // loggedInName,
    // setToken,
    // setIsLoggedIn,
    // setLoggedInUserId,
    // setLoggedInName,
  } = useContext(appContext);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/products", {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((results) => {
  //       setProducts(results.data.products);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data.message);
  //       setProducts(<>{error.response.data.message}</>);
  //       // setTimeout(() => {
  //       //   location.href = "/users/login";
  //       // }, 3000);
  //     });
  // }, []);

  return (
    <section className="products">
      {/* {successfulDelete && <>{successfulDelete}</>}
      {successfulUpdate && <>{successfulUpdate}</>} */}

      {products ? (
        Array.isArray(products) && products.length > 0 ? (
          <>
            <div className="text-center container py-5">
              <h4 className="mt-4 mb-5">
                <strong>Products</strong>
              </h4>
              <div className="d-flex flex-wrap align-items-center justify-content-center">
                {products.map((product) => {
                  return (
                    <div className="col-xl-3 col-lg-4 col-md-5 col-sm-8 col-10 m-4">
                      <div
                        className="card product"
                        key={product._id.$oid}
                        id={product._id.$oid}
                      >
                        <div className="bg-image hover-zoom">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
                            className="w-100"
                            alt=""
                          />
                          <a href="#!">
                            <div className="mask">
                              <div className="d-flex justify-content-start align-items-end h-100">
                                <h5>
                                  <span className="badge bg-danger ms-2">
                                    Fav
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
                          <a href="/">
                            <h5 className="card-title mb-3">Product name</h5>
                          </a>
                          <a href="/" className="text-reset">
                            <p>Category</p>
                          </a>
                          <h6 className="mb-3">$61.99</h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div>{products}</div>
        )
      ) : (
        <div>No Products Yet</div>
      )}
    </section>
  );
};

export default Products;

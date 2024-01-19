import axios from "axios";
import { appContext } from "../../App";
import "./style.css";

import React, { useContext, useEffect /* useState */ } from "react";
// import { MDBBtn } from "mdb-react-ui-kit";

const Cart = () => {
  const { userToken, userCart, setUserCart } = useContext(appContext);
  console.log(userCart);

  //* total num of Items in the cart.
  const numOfItems = userCart.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0
  );

  //* total price of Items in the cart.
  const totalPrice = userCart.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.product.price,
    0
  );

  //* get Cart Items
  useEffect(() => {
    axios
      .get("http://localhost:5000/carts", {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      })
      .then((results) => {
        // console.log(results.data.userCart);
        setUserCart(results.data.userCart);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setUserCart(<>{error.response.data.message}</>);
      });
  }, [setUserCart, userToken]);

  //! mappedUserCart ///////////////////////////////
  const mappedUserCart = userCart.map((cartItem) => {
    return (
      <div
        className="row mb-2 d-flex justify-content-between align-items-center w-100 col-12"
        key={cartItem.product._id}
        id={cartItem.product._id}
      >
        <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2">
          <img
            src={cartItem.product.images[0]}
            className="img-fluid rounded-3"
            alt={cartItem.product.productName}
          />
        </div>
        <div className="col-sm-5 col-md-5 col-lg-4 col-xl-3 text-center">
          <h6 className="text-muted">{cartItem.product.categories?.[0]}</h6>
          <h6 className="text-black mb-0">{cartItem.product.productName}</h6>
        </div>
        <div className="col-sm-2 col-md-2 col-lg-3 col-xl-3 text-center d-flex justify-content-between align-items-center">
          {cartItem.quantity === 1 ? (
            <button
              className="btn btn-link px-2"
              //* deleteCartItem ////////////////////

              onClick={(e) => {
                axios
                  .delete(
                    `http://localhost:5000/carts/${cartItem.product._id}`,
                    {
                      headers: {
                        authorization: `Bearer ${userToken}`,
                      },
                    }
                  )
                  .then((result) => {
                    console.log(
                      `item: ( ${cartItem.product.productName} ) has been deleted from the cart`
                    );

                    //* delete the cartItem from the state holds all userCartItems
                    const newUserCart = userCart.filter((item, i) => {
                      return cartItem.product._id !== item.product._id;
                    });
                    setUserCart(newUserCart);
                  })
                  .catch((error) => {
                    console.log(error.response.data.message);
                  });
              }}
            >
              <i className="fas fa-x text-danger"></i>
            </button>
          ) : (
            <button
              className="btn btn-link px-2"
              onClick={(e) => {
                //* decrement cartItem quantity--  ////////////////////
                cartItem.quantity--;
                axios
                  .put(
                    `http://localhost:5000/carts/${cartItem.product._id}`,
                    { quantity: cartItem.quantity },
                    {
                      headers: {
                        authorization: `Bearer ${userToken}`,
                      },
                    }
                  )
                  .then((result) => {
                    //* update the cartItem from the state holds all userCartItems
                    setUserCart(userCart.map((item, i) => item));

                    console.log(
                      `item: ( ${cartItem.product.productName} ) quantity decreased to ${cartItem.quantity}`
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              <i className="fas fa-minus"></i>
            </button>
          )}

          <span className="cartItem-quantity">{cartItem.quantity}</span>

          <button
            className="btn btn-link px-2"
            onClick={(e) => {
              //* increment cartItem quantity++  ////////////////////
              cartItem.quantity++;
              axios
                .put(
                  `http://localhost:5000/carts/${cartItem.product._id}`,
                  { quantity: cartItem.quantity },
                  {
                    headers: {
                      authorization: `Bearer ${userToken}`,
                    },
                  }
                )
                .then((result) => {
                  //* update the cartItem from the state holds all userCartItems
                  setUserCart(userCart.map((item, i) => item));

                  console.log(
                    `item: ( ${cartItem.product.productName} ) quantity increased to ${cartItem.quantity}`
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="col-sm-3 col-md-3 col-lg-2 col-xl-2 offset-lg-1 text-center">
          <h6 className="mb-0">
            ${cartItem.product.price * cartItem.quantity}
          </h6>
        </div>
        <hr className="mt-4" />
      </div>
    );
  });

  //! updateQuantity //////////////////// not working yet
  // const [quantity, setQuantity] = useState(1);
  // const updateQuantity = (e, cartItemId) => {
  //   userCart.map((cartItem) => {
  //     if (cartItem.product.toString() === cartItemId) {
  //       // setQuantity(e.target.value);
  //       // e.target.value = quantity;

  //       console.log("quantity", quantity);
  //     }
  //   });
  // };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#d2c9ff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className=" p-md-5 p-sm-4 p-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1 className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">{numOfItems} item/s</h6>
                      </div>
                      <hr className="my-4" />

                      <div className="products d-flex flex-wrap justify-content-center">
                        {userCart ? (
                          Array.isArray(userCart) && userCart.length > 0 ? (
                            mappedUserCart
                          ) : (
                            <div>{userCart}</div>
                          )
                        ) : (
                          <div>No Products Yet</div>
                        )}
                      </div>

                      <div className="pt-1">
                        <h6 className="mb-0">
                          <a href="#!" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey z-0">
                    <div className="p-5 sticky-top ">
                      <h3 className="fw-bold mb-5 mt-2 mt-lg-5 pt-1">
                        Summary
                      </h3>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">items Total</h5>
                        <h5>${totalPrice}</h5>
                      </div>

                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">Shipping</h5>
                        <h6>Delivery: $5.00</h6>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>${totalPrice + 5}</h5>
                      </div>

                      <button
                        type="button"
                        className="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;

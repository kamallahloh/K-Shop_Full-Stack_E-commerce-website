import "./App.css";

import { createContext, useState } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";

import { Cloudinary } from "@cloudinary/url-gen";

import Cart from "./components/Cart/Cart";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import StoreDashboard from "./components/StoreDashboard";
import StoreLogin from "./components//StoreLogin/StoreLogin";
import StoreRegister from "./components/StoreRegister/StoreRegister";
import UserDashboard from "./components/UserDashboard";
import UserLogin from "./components/UserLogin/UserLogin";
import UserRegister from "./components/UserRegister/UserRegister";
import NotFound from "./components/NotFound";

export const appContext = createContext();

function App() {
  //*  LocalStorage //////////////////////////
  const [userLocalStorage, setUserLocalStorage] = useState(
    JSON.parse(localStorage.getItem("userLocalStorage")) || {
      userToken: null,
      isUserLoggedIn: false,
    }
  );
  const [storeLocalStorage, setStoreLocalStorage] = useState(
    JSON.parse(localStorage.getItem("storeLocalStorage")) || {
      storeToken: null,
      isStoreLoggedIn: false,
      tokenStoreId: 0,
    }
  );

  const { userToken, isUserLoggedIn } = userLocalStorage;
  const { storeToken, isStoreLoggedIn, tokenStoreId } = storeLocalStorage;

  //*  Products list //////////////////////////
  const [products, setProducts] = useState([]);

  //! [...products] creates a shallow copy, so reverse() does not mutate the original.
  const reversedProducts = [...products].reverse();
  // console.log('reversedProducts', reversedProducts)

  //* for the searchBar input value //////////////////////////
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const search = searchParams.get("search");

  const searchedProducts = reversedProducts.filter((product) => {
    return (
      product.productName.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  });
  //*  userCart list //////////////////////////
  const [userCart, setUserCart] = useState([]);
  //* addToCart /////////////////////
  const [successfullyAddedToCart, setSuccessfullyAddedToCart] = useState("");
  const [addedProductId, setAddedProductId] = useState(0);

  //* Upload Images to Cloudinary //////////////////////////
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  // eslint-disable-next-line
  const cld = new Cloudinary({ cloud: { cloudName: "dpbh42kjy" } });

  return (
    <appContext.Provider
      value={{
        userToken,
        isUserLoggedIn,
        userLocalStorage,
        setUserLocalStorage,
        //
        storeToken,
        tokenStoreId,
        isStoreLoggedIn,
        storeLocalStorage,
        setStoreLocalStorage,
        //
        products,
        setProducts,
        searchedProducts,
        search,
        setSearchParams,
        //
        userCart,
        setUserCart,
        successfullyAddedToCart,
        setSuccessfullyAddedToCart,
        addedProductId,
        setAddedProductId,
        //
        image,
        setImage,
        url,
        setUrl,
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          {/* //! still need more thinking and reassign the paths after all paths
          finishes. */}

          {isUserLoggedIn && (
            //! all the paths allowed to the Logged in user
            <>
              <Route path="/carts" element={<Cart />} />
              <Route path="/users/:id" element={<UserDashboard />} />
              <Route path="/stores/login" element={<StoreLogin />} />
              <Route path="/stores/register" element={<StoreRegister />} />
            </>
          )}
          {isStoreLoggedIn && (
            //! all the paths allowed to logged in stores
            <>
              <Route path="/users/login" element={<UserLogin />} />
              <Route path="/users/register" element={<UserRegister />} />
            </>
          )}
          {
            //! routes that available to public if neither store or user logged in.
            <>
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<Products />} />
              {/* <Route path="/users/" element={<UsersList />} /> */}
              {/* <Route path="/stores/" element={<StoresList />} /> */}
              <Route path="/users/login" element={<UserLogin />} />
              <Route path="/users/register" element={<UserRegister />} />
              <Route path="/stores/login" element={<StoreLogin />} />
              <Route path="/stores/register" element={<StoreRegister />} />
              <Route path="/stores/:id" element={<StoreDashboard />} />
            </>
          }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </appContext.Provider>
  );
}

export default App;

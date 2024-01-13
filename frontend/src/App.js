import "./App.css";

import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Cart from "./components/Cart";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import StoreDashboard from "./components/StoreDashboard";
import StoreLogin from "./components//StoreLogin/StoreLogin";
import StoreRegister from "./components/StoreRegister/StoreRegister";
import UserDashboard from "./components/UserDashboard";
import UserLogin from "./components/UserLogin/UserLogin";
import UserRegister from "./components/UserRegister/UserRegister";

export const appContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || true
  );
  return (
    <appContext.Provider value={{ token, setToken, isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        <Navbar />
        <Routes>
          {/* {isLoggedIn ? (
            <> */}
          <Route path="/products" element={<Products />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="/users/:id" element={<UserDashboard />} />
          {/* </>
          ) : (
            <> */}
          <Route path="/products" element={<Products />} />
          <Route path="/users/login" element={<UserLogin />} />
          <Route path="/users/register" element={<UserRegister />} />
          <Route path="/stores/" element={<StoreDashboard />} />
          <Route path="/stores/login" element={<StoreLogin />} />
          <Route path="/stores/register" element={<StoreRegister />} />
          {/* </>
          )} */}
          <Route path="*" element={<UserLogin />} />
        </Routes>
      </div>
    </appContext.Provider>
  );
}

export default App;

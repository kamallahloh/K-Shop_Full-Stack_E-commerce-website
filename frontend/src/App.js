import "./App.css";

import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Cart from "./components/Cart";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import StoreDashboard from "./components/StoreDashboard";
// import StoreLogin from "./components/StoreLogin";
// import StoreRegister from "./components/StoreRegister";
import UserDashboard from "./components/UserDashboard";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";

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
          {isLoggedIn ? (
            <>
              <Route path="/products" element={<Home />} />
              <Route path="/carts" element={<Cart />} />
              <Route path="/users/:id" element={<UserDashboard />} />
            </>
          ) : (
            <>
              <Route path="/products" element={<Home />} />
              <Route path="/users/login" element={<UserLogin />} />
              <Route path="/users/register" element={<UserRegister />} />
              <Route path="/stores/" element={<StoreDashboard />} />
              {/* <Route path="/stores/login" element={<StoreLogin />} />
              <Route path="/stores/register" element={<StoreRegister />} /> */}
            </>
          )}
          <Route path="*" element={<UserLogin />} />
        </Routes>
      </div>
    </appContext.Provider>
  );
}

export default App;

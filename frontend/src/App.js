import "./App.css";

import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";

export const appContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  return (
    <appContext.Provider value={(token, setToken, isLoggedIn, setIsLoggedIn)}>
      <div className="App">
        <Navbar />
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/users/login" element={<UserLogin />} />
              <Route path="/users/register" element={<UserRegister />} />
            </>
          )}
          <Route path="*" element={<UserLogin />} />
        </Routes>
      </div>
    </appContext.Provider>
  );
}

export default App;

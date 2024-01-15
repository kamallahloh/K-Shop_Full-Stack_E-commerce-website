import "./App.css";

import { createContext, useState } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";

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
  const [userLocalStorage, setUserLocalStorage] = useState(
    JSON.parse(localStorage.getItem("userLocalStorage")) || {
      token: null,
      isUserLoggedIn: true,
    }
  );

  const { token, isUserLoggedIn } = userLocalStorage;

  // const setToken = setUserLocalStorage({ token });
  // const setIsUserLoggedIn = setUserLocalStorage({ isUserLoggedIn });

  // const [token, setToken] = useState(localStorage.getItem("token") || null);
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(
  //   JSON.parse(localStorage.getItem("isUserLoggedIn")) || true
  // );

  const [products, setProducts] = useState([
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8c2",
      },
      id: 1,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Majestic Mountain Graphic T-Shirt",
      price: 44,
      description:
        "Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.",
      images: [
        "https://i.imgur.com/QkIa5tT.jpeg",
        "https://i.imgur.com/jb5Yu0h.jpeg",
        "https://i.imgur.com/UlxxXyG.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8c3",
      },
      id: 2,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Classic Red Pullover Hoodie",
      price: 10,
      description:
        "Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.",
      images: [
        "https://i.imgur.com/1twoaDy.jpeg",
        "https://i.imgur.com/FDwQgLy.jpeg",
        "https://i.imgur.com/kg1ZhhH.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8c4",
      },
      id: 3,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Classic Heather Gray Hoodie",
      price: 69,
      description:
        "Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.",
      images: [
        "https://i.imgur.com/cHddUCu.jpeg",
        "https://i.imgur.com/CFOjAgK.jpeg",
        "https://i.imgur.com/wbIMMme.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8c5",
      },
      id: 4,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Classic Grey Hooded Sweatshirt",
      price: 90,
      description:
        "Elevate your casual wear with our Classic Grey Hooded Sweatshirt. Made from a soft cotton blend, this hoodie features a front kangaroo pocket, an adjustable drawstring hood, and ribbed cuffs for a snug fit. Perfect for those chilly evenings or lazy weekends, it pairs effortlessly with your favorite jeans or joggers.",
      images: [
        "https://i.imgur.com/R2PN9Wq.jpeg",
        "https://i.imgur.com/IvxMPFr.jpeg",
        "https://i.imgur.com/7eW9nXP.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8c6",
      },
      id: 5,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Classic Black Hooded Sweatshirt",
      price: 79,
      description:
        "Elevate your casual wardrobe with our Classic Black Hooded Sweatshirt. Made from high-quality, soft fabric that ensures comfort and durability, this hoodie features a spacious kangaroo pocket and an adjustable drawstring hood. Its versatile design makes it perfect for a relaxed day at home or a casual outing.",
      images: [
        "https://i.imgur.com/cSytoSD.jpeg",
        "https://i.imgur.com/WwKucXb.jpeg",
        "https://i.imgur.com/cE2Dxh9.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8c7",
      },
      id: 6,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Classic Comfort Fit Joggers",
      price: 25,
      description:
        "Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers. These versatile black joggers feature a soft elastic waistband with an adjustable drawstring, two side pockets, and ribbed ankle cuffs for a secure fit. Made from a lightweight and durable fabric, they are ideal for both active days and relaxed lounging.",
      images: [
        "https://i.imgur.com/ZKGofuB.jpeg",
        "https://i.imgur.com/GJi73H0.jpeg",
        "https://i.imgur.com/633Fqrz.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8c8",
      },
      id: 7,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Classic Comfort Drawstring Joggers",
      price: 79,
      description:
        "Experience the perfect blend of comfort and style with our Classic Comfort Drawstring Joggers. Designed for a relaxed fit, these joggers feature a soft, stretchable fabric, convenient side pockets, and an adjustable drawstring waist with elegant gold-tipped detailing. Ideal for lounging or running errands, these pants will quickly become your go-to for effortless, casual wear.",
      images: [
        "https://i.imgur.com/mp3rUty.jpeg",
        "https://i.imgur.com/JQRGIc2.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8c9",
      },
      id: 8,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Classic Red Jogger Sweatpants",
      price: 98,
      description:
        "Experience ultimate comfort with our red jogger sweatpants, perfect for both workout sessions and lounging around the house. Made with soft, durable fabric, these joggers feature a snug waistband, adjustable drawstring, and practical side pockets for functionality. Their tapered design and elastic cuffs offer a modern fit that keeps you looking stylish on the go.",
      images: [
        "https://i.imgur.com/9LFjwpI.jpeg",
        "https://i.imgur.com/vzrTgUR.jpeg",
        "https://i.imgur.com/p5NdI6n.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8ca",
      },
      id: 9,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Classic Navy Blue Baseball Cap",
      price: 61,
      description:
        "Step out in style with this sleek navy blue baseball cap. Crafted from durable material, it features a smooth, structured design and an adjustable strap for the perfect fit. Protect your eyes from the sun and complement your casual looks with this versatile and timeless accessory.",
      images: [
        "https://i.imgur.com/R3iobJA.jpeg",
        "https://i.imgur.com/Wv2KTsf.jpeg",
        "https://i.imgur.com/76HAxcA.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33eb417636992bdc0c8cb",
      },
      id: 10,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      productName: "Classic Blue Baseball Cap",
      price: 86.513165,
      description:
        "Top off your casual look with our Classic Blue Baseball Cap, made from high-quality materials for lasting comfort. Featuring a timeless six-panel design with a pre-curved visor, this adjustable cap offers both style and practicality for everyday wear.",
      images: [
        "https://i.imgur.com/wXuQ7bm.jpeg",
        "https://i.imgur.com/BZrIEmb.jpeg",
        "https://i.imgur.com/KcT6BE0.jpeg",
      ],
      creationAt: "2024-01-13T22:40:12.000Z",
      updatedAt: "2024-01-13T22:40:12.000Z",
      categories: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-01-13T22:40:12.000Z",
        updatedAt: "2024-01-13T22:40:12.000Z",
      },
    },
    {
      _id: {
        $oid: "65a33efd103a57a575ddf497",
      },
      productName: "p",
      description: "p",
      images: [],
      categories: [],
      price: 1,
      store: {
        $oid: "65a2f6a927591f2f7b7d8f84",
      },
      __v: 0,
    },
  ]);

  //* for the searchBar input value
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const search = searchParams.get("search");

  const searchedProducts = products.filter((product) => {
    return (
      product.productName.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <appContext.Provider
      value={{
        token,
        // setToken,
        isUserLoggedIn,
        // setIsUserLoggedIn,
        userLocalStorage,
        setUserLocalStorage,
        products,
        setProducts,
        searchedProducts,
        search,
        setSearchParams,
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          {/* {isUserLoggedIn ? (
            <> */}
          <Route path="/" element={<Products />} />
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
          <Route
            path="/stores/65a2f6a927591f2f7b7d8f84"
            element={<StoreDashboard />}
          />
          {/* 
          //! testing
          </>
          )}
           */}
          <Route path="*" element={<UserLogin />} />
        </Routes>
      </div>
    </appContext.Provider>
  );
}

export default App;

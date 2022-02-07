import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./libs/scrollToTop";

// PAGES
import Home from "./pages/Home";
import Product from "./pages/Product";
import MyCart from "./pages/MyCart";
import Brand from "./pages/Brands";
import Wishlist from "./pages/Wishlist";

ReactDOM.render(
  <BrowserRouter>
    <Navbar>
      <ScrollToTop>
        <Routes>
          <Route index element={<Home />} />
          <Route path="brands/:id" element={<Brand />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="profile">
            <Route path="my-cart" element={<MyCart />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </Navbar>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

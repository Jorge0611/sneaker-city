import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./libs/scrollToTop";

// PAGES
import Home from "./pages/Home";
import Product from "./pages/store/Product";
import MyCart from "./pages/profile/MyCart";
import Brand from "./pages/store/Brands";
import Wishlist from "./pages/profile/Wishlist";

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <ScrollToTop>
        <Routes>
          <Route index element={<Home />} />
          <Route path="store">
            <Route index element={<Home />} />
            <Route path="brands/:id" element={<Brand />} />
            <Route path="product/:id" element={<Product />} />
          </Route>
          <Route path="profile">
            <Route path="my-cart" element={<MyCart />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </Layout>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./style.css";
import About from "./views/about";
import Home from "./views/Home";
import TermsConditions from "./views/terms-conditions";
import ProductFeatures from "./views/product-features";
import Contact from "./views/contact";
import Cart from "./views/cart";
import ShippingInfo from "./views/shipping-info";
import RetailLocations from "./views/retail-locations";
import ReturnPolicy from "./views/return-policy";
import { Context } from "./context/cartContext";
import CartView from "./views/Cart/CartView";
import Category from "./views/Category";
import { Toaster } from "react-hot-toast";
import Polos from "./views/polos";
import CartOpener from "./views/Cart/CartOpener";
import Success from "./views/Success";
import CartTrending from "./views/CartTrending";

const App = () => {
  // const [show, setShow] = useState(false);
  return (
    <>
      <Context>
        <div className="the_parent_container">
          <BrowserRouter>
            <CartView />
            <Toaster />
            <CartOpener />
            <Routes>
              <Route element={<About />} path="/about" />
              <Route element={<Success />} path="/success" />
              <Route element={<Home />} path="/" />
              <Route element={<TermsConditions />} path="/terms-conditions" />
              <Route element={<Polos />} path="category/polos" />
              <Route element={<ProductFeatures />} path="/product-features1" />
              <Route element={<Contact />} path="/contact" />
              <Route element={<Cart />} path="/cart/:slug" />
              <Route element={<Category />} path="/category/:category" />
              <Route element={<ShippingInfo />} path="/shipping info" />
              {/* <Route element={<Hats />} path="/hats" /> */}
              <Route element={<RetailLocations />} path="/retail-locations" />
              <Route element={<ReturnPolicy />} path="/return-policy1" />
              <Route element={<CartTrending />} path="/cartTrending/:slug" />
            </Routes>
          </BrowserRouter>
        </div>
      </Context>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode forceRerender={true}>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);

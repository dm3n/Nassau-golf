import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";
import { useCartContext } from "../context/cartContext";
import { runFireworks } from "../lib/utlis";
import "./success.css";

function Success() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useCartContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2 style={{ padding: "20px 0px" }}>Thank you for your order!</h2>
        {/* <p className="email-msg">Check your email inbox for the receipt.</p> */}
        {/* <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            sanitydaniel2@gmail.com
          </a>
        </p> */}
        <Link to="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;

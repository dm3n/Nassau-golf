import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./product-selction.css";

const ProductSelction = (props) => {
  return (
    <div className={`product-selction-container ${props.rootClassName} `}>
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="product-selction-image"
      />
      <div className="product-selction-container1">
        <div className="product-selction-container2">
          <h3 className="product-selction-text">{props.heading}</h3>
          <div className="product-selction-container3">
            <svg viewBox="0 0 1024 1024" className="product-selction-icon">
              <path
                d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"
                className=""
              ></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="product-selction-icon02">
              <path
                d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"
                className=""
              ></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="product-selction-icon04">
              <path
                d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"
                className=""
              ></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="product-selction-icon06">
              <path
                d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"
                className=""
              ></path>
            </svg>
            <svg viewBox="0 0 1024 1024" className="product-selction-icon08">
              <path
                d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z"
                className=""
              ></path>
            </svg>
          </div>
          <div className="product-selction-container4">
            <span className="product-selction-currency">{props.currency}</span>
            <span className="product-selction-value">{props.value}</span>
          </div>
          <select className="product-selction-select">
            <option value="Small" className="">
              Small
            </option>
            <option value="Medium " className="">
              Medium
            </option>
            <option value="Large" className="">
              Large
            </option>
          </select>
          <Link to="/cart" className="product-selction-navlink button">
            {props.button}
          </Link>
        </div>
      </div>
    </div>
  );
};

ProductSelction.defaultProps = {
  heading: "Project Title",
  currency: "$",
  image_alt: "image",
  rootClassName: "",
  button: "Add to Cart",
  value: "429",
  image_src:
    "https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDI0fHxmb29kfGVufDB8fHx8MTYyNjQ0OTIzNQ&ixlib=rb-1.2.1&h=900",
};

ProductSelction.propTypes = {
  heading: PropTypes.string,
  currency: PropTypes.string,
  image_alt: PropTypes.string,
  rootClassName: PropTypes.string,
  button: PropTypes.string,
  value: PropTypes.string,
  image_src: PropTypes.string,
};

export default ProductSelction;

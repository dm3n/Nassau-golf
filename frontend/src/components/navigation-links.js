import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navigation-links.css";
import { useCartContext } from "../context/cartContext";

const NavigationLinks = (props) => {
  const { setShowCart } = useCartContext();
  return (
    <nav className={`navigation-links-nav ${props.rootClassName} `}>
      <Link to="/about" className="navigation-links-navlink">
        {props.text}
      </Link>
      <Link to="/contact" className="navigation-links-navlink1">
        {props.text1}
      </Link>
      <Link to={`/category/:hats`} className="navigation-links-navlink2">
        {props.text2}
      </Link>
      <Link to="/category/polos" className="navigation-links-navlink3">
        {props.text3}
      </Link>
      <img
        src={props.image_src}
        alt={props.image_alt}
        className="navigation-links-image"
        onClick={() => setShowCart(true)}
        style={{ cursor: "pointer" }}
      />
    </nav>
  );
};

NavigationLinks.defaultProps = {
  text: "About",
  text3: "Polos",
  text1: "Contact",
  rootClassName: "",
  text2: "Hats",
  image_src: "/playground_assets/golf-cart-200h.png",
  image_alt: "image",
};

NavigationLinks.propTypes = {
  text: PropTypes.string,
  text3: PropTypes.string,
  text1: PropTypes.string,
  rootClassName: PropTypes.string,
  text2: PropTypes.string,
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
};

export default NavigationLinks;

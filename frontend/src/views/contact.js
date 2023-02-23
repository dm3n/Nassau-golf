import React from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import "./contact.css";
import Header from "./Header";

const Contact = (props) => {
  return (
    <>
      <Helmet>
        <title>Contact - Nassau Golf</title>
        <meta property="og:title" content="Contact - Nassau Golf" />
      </Helmet>
      <Header />
      <div className="contact-container">
        <div className=" content">
          <img
            alt="image"
            src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDR8fGdvbGZ8ZW58MHx8fHwxNjY5NzU3MDMy&amp;ixlib=rb-4.0.3&amp;h=800"
            className="contact-image_sm"
          />
          <div className="content_container_1-2">
            <div className="content-1">
              <h2 className="contact-text03">FAQ</h2>
              <Link to="/shipping-info" className="contact-text04 navbar-link">
                <br></br>
                <span>Shipping info</span>
                <br></br>
              </Link>
              <Link
                to="/terms-conditions"
                className="contact-text04 navbar-link"
              >
                <br></br>
                <span>Terms &amp; Conditions</span>
                <br></br>
              </Link>
              <Link
                to="/retail-locations"
                className="contact-text04 navbar-link"
              >
                <br></br>
                <span>Retail locations</span>
                <br></br>
              </Link>
              <Link
                to="/product-features1"
                className="contact-text04 navbar-link"
              >
                <br></br>
                <span>Product features</span>
                <br></br>
              </Link>
              <Link to="/return-policy1" className="contact-text04 navbar-link">
                <br></br>
                <span>return policy</span>
                <br></br>
              </Link>
              <Link to="/about" className="contact-text04 navbar-link">
                <br></br>
                <span>about us</span>
                <br></br>
              </Link>
            </div>
            <div className="content-2">
              <span className="">
                <h2 className="contact-text03">Customer Service</h2>
                <br></br>
                <br></br>
                <span className="contact-text04 navbar-link">
                  ( 905 ) - 112 -1122
                </span>
                <br></br>
                <br></br>
                <span className="contact-text04 navbar-link">
                  nassau@contact.com
                </span>
                <br></br>
              </span>
            </div>
          </div>
        </div>
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDR8fGdvbGZ8ZW58MHx8fHwxNjY5NzU3MDMy&amp;ixlib=rb-4.0.3&amp;h=800"
          className="contact-image"
        />
      </div>
    </>
  );
};

export default Contact;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import NavigationLinks from "../components/navigation-links";
import FeatureCard4 from "../components/feature-card4";
import "./shipping-info.css";
import { client, urlFor } from "../lib/client";
import Header from "./Header";
import LoadingComponent from "./Loading";

const ShippingInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchShipping = async () => {
      const shippingQuery = `*[_type == "shipping_info"]`;
      const req = await client.fetch(shippingQuery);
      if (req) {
        setData(req);
        setIsLoading(false);
      }
    };
    fetchShipping();
  }, []);
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="shipping-info-container">
      <Helmet>
        <title>Shipping-Info - Nassau Golf</title>
        <meta property="og:title" content="Shipping-Info - Nassau Golf" />
      </Helmet>
      <div className="shipping-info-features">
        <Header />
        <h1 className="shipping-info-text">Shipping info</h1>
        <div className="shipping-info-separator1"></div>
        <div className="shipping-info-container1">
          <div className="shipping-info-container2">
            <FeatureCard4 data={data} rootClassName="rootClassName1" />
          </div>
          <img
            alt="image"
            src={urlFor(data[0].image[0])}
            className="shipping-info-image1"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;

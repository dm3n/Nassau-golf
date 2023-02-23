import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import NavigationLinks from "../components/navigation-links";
import FeatureCard4 from "../components/feature-card4";
import "./return-policy.css";
import { client, urlFor } from "../lib/client";
import Header from "./Header";
import LoadingComponent from "./Loading";

const ReturnPolicy = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchShipping = async () => {
      const retailLoactionQuery = `*[_type == "return_policy"]`;
      const req = await client.fetch(retailLoactionQuery);
      if (req) {
        setData(req);
        setIsLoading(false);
      }
    };
    fetchShipping();
  }, []);
  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }
  return (
    <div className="return-policy-container">
      <Helmet>
        <title>Return-Policy - Nassau Golf</title>
        <meta property="og:title" content="Return-Policy - Nassau Golf" />
      </Helmet>
      <div className="return-policy-features">
        <Header />
        <h1 className="return-policy-text">Return Policy</h1>
        <div className="return-policy-separator1"></div>
        <div className="return-policy-container1">
          <div className="return-policy-container2">
            {!!data.length && (
              <FeatureCard4 data={data} rootClassName="rootClassName4" />
            )}
          </div>
          {!!data.length && (
            <img
              alt="image"
              src={!!data ? urlFor(data[0].image[0]) : ""}
              className="retail-locations-image1"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;

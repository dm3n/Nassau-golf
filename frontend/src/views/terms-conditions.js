import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import NavigationLinks from "../components/navigation-links";
import FeatureCard4 from "../components/feature-card4";
import "./terms-conditions.css";
import { client, urlFor } from "../lib/client";
import Header from "./Header";
import LoadingComponent from "./Loading";

const TermsConditions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchShipping = async () => {
      const retailLoactionQuery = `*[_type == "terms_conditions"]`;
      const req = await client.fetch(retailLoactionQuery);
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
    <div className="terms-conditions-container">
      <Helmet>
        <title>Terms-Conditions - Nassau Golf</title>
        <meta property="og:title" content="Terms-Conditions - Nassau Golf" />
      </Helmet>
      <div className="terms-conditions-features">
        <Header />
        <h1 className="terms-conditions-text">Terms and Conditions</h1>
        <div className="terms-conditions-separator1"></div>
        <div className="terms-conditions-container1">
          <div className="terms-conditions-container2">
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

export default TermsConditions;

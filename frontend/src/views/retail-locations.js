import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import NavigationLinks from "../components/navigation-links";
import FeatureCard4 from "../components/feature-card4";
import "./retail-locations.css";
import { client, urlFor } from "../lib/client";
import Header from "./Header";
import LoadingComponent from "./Loading";

const RetailLocations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchShipping = async () => {
      const retailLoactionQuery = `*[_type == "retailLocation"]`;
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
    <div className="retail-locations-container">
      <Helmet>
        <title>Retail-locations - Nassau Golf</title>
        <meta property="og:title" content="Retail-locations - Nassau Golf" />
      </Helmet>
      <div className="retail-locations-features">
        <Header />
        <h1 className="retail-locations-text">Retail Locations</h1>
        <div className="retail-locations-separator1"></div>
        <div className="retail-locations-container1">
          <div className="retail-locations-container2">
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

export default RetailLocations;

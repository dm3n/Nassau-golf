import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import FeatureCard4 from "../components/feature-card4";
import "./product-features.css";
import { client, urlFor } from "../lib/client";
import Header from "./Header";
import LoadingComponent from "./Loading";

const ProductFeatures = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchShipping = async () => {
      const retailLoactionQuery = `*[_type == "productFeatures"]`;
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
    <div className="product-features-container">
      <Helmet>
        <title>Product-Features - Nassau Golf</title>
        <meta property="og:title" content="Product-Features - Nassau Golf" />
      </Helmet>
      <Header />
      <div className="product-features-features">
        <h1 className="product-features-text">Product Features</h1>
        <div className="product-features-separator1"></div>
        <div className="product-features-container1">
          <div className="product-features-container2">
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

export default ProductFeatures;

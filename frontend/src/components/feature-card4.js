import React from "react";

import PropTypes from "prop-types";

import "./feature-card4.css";
import { PortableText } from "@portabletext/react";

const FeatureCard4 = ({ data }) => {
  return (
    <div className={`feature-card4-feature-card`}>
      <svg viewBox="0 0 1024 1024" className="feature-card4-icon">
        <path
          d="M726 252l-256 132v386q92 4 152 28t60 56q0 34-75 59t-181 25-181-25-75-59q0-50 128-74v74h86v-768zM768 832q0-28 18-46t46-18 46 18 18 46-18 46-46 18-46-18-18-46z"
          className=""
        ></path>
      </svg>
      <h2 className="feature-card4-text">{data[0].subHeading}</h2>
      <span className="feature-card4-text1">
        <PortableText value={data[0].content} />
      </span>
    </div>
  );
};

export default FeatureCard4;

import React from "react";

import PropTypes from "prop-types";

import "./category-card.css";
import { urlFor } from "../lib/client";

const CategoryCard = ({ data }) => {
  return (
    <div className={`category-card-category-card`}>
      <img
        alt={"categorie_image"}
        src={urlFor(data.image)}
        className="category-card-image"
      />
    </div>
  );
};

export default CategoryCard;

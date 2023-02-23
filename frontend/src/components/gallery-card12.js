import React from "react";

import PropTypes from "prop-types";

import "./gallery-card12.css";
import { urlFor } from "../lib/client";
import { Link } from "react-router-dom";
import ProductCard from "../views/productsCard/ProductCard";

const GalleryCard12 = ({ data }) => {
  return (
    <div className={`gallery-card12-gallery-card `}>
      <ProductCard data={data} />
    </div>
  );
};

GalleryCard12.defaultProps = {
  rootClassName: "",
  subtitle: "Hat description",
  title: "Golf Hat     $45",
  image_alt: "image",
  image_src:
    "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEyfHxmb3Jlc3R8ZW58MHx8fHwxNjI2MjUxMjg4&ixlib=rb-1.2.1&h=1200",
};

GalleryCard12.propTypes = {
  rootClassName: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  image_alt: PropTypes.string,
  image_src: PropTypes.string,
};

export default GalleryCard12;

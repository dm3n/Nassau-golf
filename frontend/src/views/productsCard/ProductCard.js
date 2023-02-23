import React from "react";
import "./product.css";
import { urlFor } from "../../lib/client";
import { Link } from "react-router-dom";
function ProductCard({ data }) {
  return (
    <div className="product_card_container">
      <div className="product_image_container">
        <Link to={`/cart/${data._id}`}>
          <img src={urlFor(data.image[0])} alt="product image" />
        </Link>

        {data.onSale && data.onSale.isOnSale && (
          <span className="">on sale %</span>
        )}
      </div>
      <div className="product_card_content">
        <h2 className="product_card_title">{data.title} </h2>
        <div className="product_card_price">
          <p
            className={data.onSale && data.onSale.isOnSale && "original_price"}
          >{`$${data.price} CAD`}</p>

          {data.onSale && data.onSale.isOnSale && (
            <p className="onSale_price">${data.onSale.salePrice} CAD</p>
          )}
        </div>
        <Link to={`/cart/${data._id}`}>
          <button className="product_card_callToAction">see detail</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

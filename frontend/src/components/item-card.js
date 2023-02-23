import "./item-card.css";
import FiveStar from "../icons/FiveStar";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ data }) => {
  const [stateData] = useState(data);
  // const handelCheckout = async () => {
  //   const stripe = await getStripe();

  //   const response = await fetch(
  //     "https://nessau-stripe.onrender.com/api/payment_stripe",
  //     {
  //       // changes this with url to were you deploy server
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify([{ ...stateData, quantity: 1 }]),
  //     }
  //   );

  //   if (response.statusCode === 500) return;
  //   toast.loading("Redirecting...");

  //   const data = await response.json();

  //   stripe.redirectToCheckout({ sessionId: data.id });
  // };
  // console.log(data);
  return (
    <div className={`item-card-gallery-card `}>
      <img
        alt={`product image`}
        src={`${urlFor(data.image[0])}`}
        className="item-card-image"
      />
      <div className="item-card-container">
        <h3 className="item-card-text">{data.title}</h3>
        <div className="item-card-container1">
          <FiveStar />
        </div>
        <div className="item-card-container2">
          <span className="item-card-value">{data.price} </span>
          <span className="item-card-currency" style={{ marginLeft: "10px" }}>
            {" "}
            CAD
          </span>
        </div>
      </div>
      <button className="button_cart_container">
        <Link to={`/cartTrending/${data.slug.current}`}>See Detail</Link>
      </button>
    </div>
  );
};

export default ItemCard;

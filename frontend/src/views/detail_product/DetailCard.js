import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../lib/client";
import Plus from "../../icons/Plus";
import Dash from "../../icons/Dash";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import "./DetailCard.css";
import AddCartIcon from "../../icons/AddCartIcon";
import { useCartContext } from "../../context/cartContext";
import { toast } from "react-hot-toast";
import getStripe from "../../lib/getStripe";
import LoadingComponent from "../Loading";

function DetailCard({ data }) {
  const { decQty, incQty, qty, onAdd } = useCartContext();
  const [stateData, setStateData] = useState(data);
  const [isItGetFree, setIsItGetFree] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenDetail, setModalOpenDetail] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [size, setSize] = useState(null);
  useEffect(() => {
    if (data.sizes) {
      setSize(data.sizes[0]);
    } else {
      setSize(null);
    }
    if (stateData.buyGetFree) {
      console.log("we find buyGetFree");
      if (stateData.buyGetFree.isGetFree) {
        setIsLoading(true);
        const fetchBuyGetFreeObject = async () => {
          const req = await client.fetch(
            `*[_type in ["product", "trending"] && _id == '${stateData.buyGetFree.freeProduct._ref}'][0]`
          );
          // console.log(req, "true");
          if (req) {
            setIsItGetFree(req);
            setIsLoading(false);
          }
        };
        fetchBuyGetFreeObject();
      }
    }
  }, []);

  // console.log(data, "data");
  if (loading) {
    return <LoadingComponent />;
  }
  // console.log(size);
  const isItONSale =
    !loading && stateData.onSale && stateData.onSale.isOnSale ? "onSale " : "";
  const handelCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch(
      "https://nessau-stripe.onrender.com/api/payment_stripe",
      {
        // changes this with url to were you deploy server
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ ...stateData, quantity: qty }]),
      }
    );

    if (response.statusCode === 500) return;
    toast.loading("Redirecting...");
    const data = await response.json();
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  const onAddFc = async () => {
    const Data = { ...stateData, selectedSize: size };
    if (stateData.buyGetFree) {
      if (stateData.buyGetFree.isGetFree) {
        const calcQty =
          (stateData.buyGetFree.freeQuantity /
            stateData.buyGetFree.buyQuantity) *
          qty;
        return onAdd(
          {
            ...Data,
            freeProduct: {
              ...isItGetFree,
              quantity: calcQty,
            },
          },
          qty,
          true
        );
      }
    }

    return onAdd(Data, qty, false);
  };

  return (
    <div className="product_detail_container">
      <div className="product_detail_image_container">
        {isModalOpenDetail ? (
          <Lightbox
            image={urlFor(data.image[0])}
            title={data.title}
            onClose={() => setModalOpenDetail(false)}
          />
        ) : (
          <>
            {stateData && (
              <img
                src={urlFor(stateData.image[0])}
                alt="free product"
                onClick={() => setModalOpenDetail(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </>
        )}
      </div>
      <div className="product_detail_content">
        <h2 className="product_detail_title">{data.title}</h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <p className={isItONSale}>{`$${data.price} CAD`}</p>
          {isItONSale && (
            <span className="">${stateData.onSale.salePrice} CAD</span>
          )}
        </div>

        <p className="description_label">description:</p>
        <p className="description">{data.description}</p>
        <div className="quantity">
          <span className="removeOne" onClick={decQty}>
            <Dash />
          </span>
          <span className="number">{qty}</span>
          <span className="addOne" onClick={incQty}>
            <Plus />
          </span>
        </div>
        {stateData.sizes && (
          <div className="form_choose_size">
            <label htmlFor="selectSize">size: </label>
            <select
              className="select_box"
              onChange={(e) => setSize(e.target.value)}
              id="selectSize"
            >
              {stateData.sizes.map((e, i) => (
                <option value={e} key={e + i}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="callToActions">
          <button
            className="product_detail_callToAction"
            onClick={() => onAddFc()}
          >
            add to Cart <AddCartIcon />
          </button>
          <button
            className="product_detail_callToAction"
            onClick={handelCheckout}
          >
            Buy now $
          </button>
        </div>
        {!!isItGetFree && (
          <div
            className="getForFree"
            style={{
              width: "100%",
              margin: "30px 0px 0px",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <div className="promo_now">
              <span>Buy </span>
              <span style={{ fontWeight: "bold" }}>
                {stateData.buyGetFree && stateData.buyGetFree.buyQuantity}
              </span>
              <span> & get </span>
              <span style={{ fontWeight: "bold" }}>
                {stateData.buyGetFree && stateData.buyGetFree.freeQuantity}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  height: "40px",
                  color: "#77dd77",
                  fontWeight: "bold",
                }}
              >
                {!!isItGetFree && (
                  <>
                    {isModalOpen ? (
                      <Lightbox
                        image={urlFor(isItGetFree.image[0])}
                        title="free product image"
                        onClose={() => setModalOpen(false)}
                      />
                    ) : (
                      <img
                        src={urlFor(isItGetFree.image[0])}
                        alt="free product image"
                        onClick={() => setModalOpen(true)}
                        style={{ height: "30px", cursor: "pointer" }}
                      />
                    )}
                  </>
                )}
                <p
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "black",
                    borderRadius: "5px",
                  }}
                >
                  {isItGetFree.title}
                </p>
              </div>
              <span> for free </span>
              {isItGetFree.sizes && (
                <div className="form_choose_size">
                  <label for="selectSize">size: </label>
                  <select
                    className="select_box"
                    onChange={(e) => setItGetFreeSize(e.target.value)}
                    id="selectSize"
                  >
                    {isItGetFree.sizes.map((e, i) => (
                      <option value="" key={e + i + "kdooo"}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailCard;

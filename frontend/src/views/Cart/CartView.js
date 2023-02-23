import React from "react";
import { useCartContext } from "../../context/cartContext";
import "./cartView.css";
import { urlFor } from "../../lib/client";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import getStripe from "../../lib/getStripe";
import { toast } from "react-hot-toast";
import Plus from "../../icons/Plus";
import Dash from "../../icons/Dash";

function CartView() {
  const {
    totalQuantities,
    cartItems,
    onRemove,
    totalPrice,
    toggleCartItemQuanitity,
    setShowCart,
    showCart,
  } = useCartContext();
  console.log(cartItems);
  const handelCheckout = async () => {
    const stripe = await getStripe();

    try {
      const response = await fetch(
        //https://nessau-stripe.onrender.com
        "https://nessau-stripe.onrender.com/api/payment_stripe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItems),
        }
      );

      if (!response.ok) {
        // Handle the error here
        return;
      }

      setShowCart(false);
      toast.loading("Redirecting...");

      const data = await response.json();

      if (!data.id) {
        // Handle the error here
        toast.error("you didn't provide i property");
        return;
      }

      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      // Handle the error here
      toast.error(error.message);
    }
  };

  const ToggelQtyFc = (item, method) => {
    if (item.freeProduct) {
      return toggleCartItemQuanitity(item, method, true);
    }
    return toggleCartItemQuanitity(item, method);
  };

  return (
    <>
      {showCart && (
        <div className="cart-wrapper">
          <div className="cart-container">
            <button
              type="button"
              className="cart-heading"
              onClick={() => setShowCart(false)}
            >
              <AiOutlineLeft />
              <span className="heading">Your Cart</span>
              <span className="cart-num-items">({totalQuantities} items)</span>
            </button>

            {cartItems.length < 1 && (
              <div className="empty-cart">
                <AiOutlineShopping size={150} />
                <h3>Your shopping bag is empty</h3>
                <Link to="/">
                  <button
                    type="button"
                    onClick={() => setShowCart(false)}
                    className="btn"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}

            <div className="product-container">
              {!!cartItems.length &&
                cartItems.map((item, i) => (
                  <div
                    key={i + "uuuguhguhuhuhuhh"}
                    className="product_container"
                  >
                    <div className="product">
                      {item && (
                        <div
                          className="cart-product-image"
                          style={{ position: "relative" }}
                        >
                          <img
                            src={urlFor(item?.image[0])}
                            style={{
                              width: "100%",
                            }}
                            onClick={() => setShowCart(false)}
                          />
                        </div>
                      )}
                      <div className="item-desc">
                        <div className="flex top">
                          <div>
                            <h5>{item && item.title}</h5>
                            {item.selectedSize && (
                              <p className="size">
                                <>size: </> <span>{item.selectedSize}</span>
                              </p>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <p
                              className=""
                              style={{ color: "black", fontWeight: "bold" }}
                            >
                              {item.onSale &&
                                item.onSale.isOnSale &&
                                `$${item.onSale.salePrice}`}
                            </p>
                            <h4 className={item.onSale && "onSale"}>
                              {item && `$${item.price}`}
                            </h4>
                          </div>
                        </div>
                        <div className="flex bottom">
                          <div>
                            <p className="quantity-desc">
                              <span
                                className="minus"
                                onClick={() => ToggelQtyFc(item, "dec")}
                              >
                                <Dash />
                              </span>
                              <span className="num">
                                {item && item.quantity}
                              </span>
                              <span
                                className="plus"
                                onClick={() => ToggelQtyFc(item, "inc")}
                              >
                                <Plus />
                              </span>
                            </p>
                          </div>
                          <button
                            type="button"
                            className="remove-item"
                            onClick={() => onRemove(item)}
                          >
                            <TiDeleteOutline />
                          </button>
                        </div>
                      </div>
                    </div>
                    {item.freeProduct && item.freeProduct.quantity >= 1 && (
                      <div className="free_product ">
                        <img
                          src={urlFor(item.freeProduct.image[0])}
                          alt={item.freeProduct.title}
                          className="free_product_image"
                        />
                        <div className="free_product_price">
                          <span className="original_freeProduct_price">
                            ${item.freeProduct.price} CAD
                          </span>
                          <span className="now_its fre">FREE</span>
                        </div>
                        <p className="free_product_quantity">
                          +{Math.floor(item.freeProduct.quantity)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {!!cartItems.length && (
              <div className="cart-bottom">
                <div className="total">
                  <h3>Subtotal:</h3>
                  <h3>${totalPrice}</h3>
                </div>
                <div className="btn-container" onClick={handelCheckout}>
                  <button
                    type="button"
                    className="btn"
                    // onClick={handelCheckout}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartView;

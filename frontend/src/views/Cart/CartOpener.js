import React from "react";
import { useCartContext } from "../../context/cartContext";

function CartOpener() {
  const { cartItems, setShowCart } = useCartContext();
  return (
    <>
      <div className="cartIcon" onClick={() => setShowCart(true)}>
        <img
          src="/playground_assets/golf-cart-200h.png"
          alt="golf cart"
          height={35}
          width={35}
          style={{ cursor: "pointer" }}
        />
        <div
          className="notify"
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {cartItems.length}
        </div>
      </div>
    </>
  );
}

export default CartOpener;

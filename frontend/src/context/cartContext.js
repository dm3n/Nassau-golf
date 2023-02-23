import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const cartContext = createContext();
const shopFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
const totalQty = localStorage.getItem("total_Qty" || 0);
const TotalP = localStorage.getItem("total_Price" || 0);

export const Context = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(shopFromLocalStorage);
  const [totalPrice, setTotalPrice] = useState(+TotalP);
  const [totalQuantities, setTotalQuantities] = useState(+totalQty);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("total_Qty", totalQuantities);
    localStorage.setItem("total_Price", totalPrice);
  }, [cartItems, totalPrice, totalQuantities]);

  const onAdd = (product, quantity, getFree) => {
    const checkProductInCart = cartItems.find(
      (item) =>
        item._id === product._id && item.selectedSize === product.selectedSize
    );

    const price =
      product.onSale && product.onSale.isOnSale
        ? product.onSale.salePrice
        : product.price;
    setTotalPrice((prevTotalPrice) => prevTotalPrice + price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (
          cartProduct._id === product._id &&
          cartProduct.selectedSize === product.selectedSize
        ) {
          if (cartProduct.freeProduct) {
            const qtyFreeP = cartProduct.freeProduct.quantity;
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
              freeProduct: {
                ...cartProduct.freeProduct,
                quantity: qtyFreeP + qtyFreeP,
              },
            };
          } else {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
        }
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.title} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find(
      (item) =>
        item._id === product._id && item.selectedSize === product.selectedSize
    );
    const newCartItems = cartItems.filter(
      (item) =>
        item._id !== product._id || item.selectedSize !== product.selectedSize
    );

    const price =
      product.onSale && product.onSale.isOnSale
        ? product.onSale.salePrice
        : product.price;
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (product, value, hasGetFree = false) => {
    foundProduct = cartItems.find(
      (item) =>
        item._id === product._id && item.selectedSize === product.selectedSize
    );
    //
    // console.log(foundProduct, "foundProduct");
    index = cartItems.findIndex(
      (p) => p._id === product._id || p.selectedSize === product.selectedSize
    );
    // console.log(cartItems, "cartItems");

    const newCartItems = cartItems.filter(
      (item) =>
        item._id !== product._id || item.selectedSize !== product.selectedSize
    );
    // console.log(newCartItems, "newCartItems");

    const { freeProduct } = hasGetFree && foundProduct;

    if (value === "inc") {
      if (freeProduct) {
        const updatedQty = foundProduct.quantity + 1;
        const calcWithQtyChanged =
          (foundProduct.buyGetFree.freeQuantity /
            foundProduct.buyGetFree.buyQuantity) *
          updatedQty;
        setCartItems([
          ...newCartItems,
          {
            ...foundProduct,
            freeProduct: { ...freeProduct, quantity: calcWithQtyChanged },
            quantity: foundProduct.quantity + 1,
          },
        ]);
      } else {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ]);
      }

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        if (!freeProduct) {
          setCartItems([
            ...newCartItems,
            { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ]);
        } else {
          const updatedQty = foundProduct.quantity - 1;
          const calcWithQtyChanged =
            (foundProduct.buyGetFree.freeQuantity /
              foundProduct.buyGetFree.buyQuantity) *
            updatedQty;
          setCartItems([
            ...newCartItems,
            {
              ...foundProduct,
              freeProduct: { ...freeProduct, quantity: calcWithQtyChanged },
              quantity: foundProduct.quantity - 1,
            },
          ]);
        }

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <cartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCartContext = () => useContext(cartContext);

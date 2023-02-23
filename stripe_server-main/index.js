require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/api/payment_stripe", async (req, res) => {
  const origin = req.get("origin");
  let freePro;
  const lineItems = req.body.map((item) => {
    if (item.freeProduct) {
      const img = item.freeProduct.image[0].asset._ref;
      const newImage = img
        .replace("image-", "https://cdn.sanity.io/images/j1ypjfte/production/")
        .replace("-jpg", ".jpg");
      const quantityOfFreeP = Math.floor(item.freeProduct.quantity);
      if (quantityOfFreeP > 0) {
        freePro = {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.freeProduct.title,
              description: `This product is coming with ${item.title} for free.`,
              images: [newImage],
              metadata: {
                name: item.title,
                description: item.description,
                selectedSize:
                  item.selectedSize ||
                  "this product doesn't have a specific size",
                price: "FREE",
              },
            },
            unit_amount: 0,
          },
          quantity: Math.floor(item.freeProduct.quantity),
        };
      }
    }

    const img = item.image[0].asset._ref;
    const newImage = img
      .replace("image-", "https://cdn.sanity.io/images/j1ypjfte/production/")
      .replace("-jpg", ".jpg");
    return {
      price_data: {
        currency: "cad",
        product_data: {
          name: item.title,
          images: [newImage],
          metadata: {
            name: item.title,
            description: item.description,
            selectedSize:
              item.selectedSize || "this product doesn't have a specific size",
            price: item.onSale ? item.onSale.salePrice : item.price,
            qty: item.quantity,
          },
        },
        unit_amount: item.onSale
          ? item.onSale.salePrice * 100
          : item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const params = {
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: lineItems,
    success_url: `${origin + "/success"}?success=true`,
    cancel_url: `${origin}?canceled=true`,
  };

  if (freePro) {
    params.line_items.push(freePro);
  }

  console.log(
    params.line_items.map((item) => item.price_data.product_data.metadata)
  );

  const session = await stripe.checkout.sessions.create(params);

  res.status(200).json(session);
});

app.listen(3336, () => console.log("listening"));

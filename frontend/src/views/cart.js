import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./cart.css";
import Footer from "./Footer/Footer";
import SocialIconsBar from "./social_icons_bar/SocialIconsBar";
import DetailCard from "./detail_product/DetailCard";
import { useParams } from "react-router-dom";
import { client } from "../lib/client";
import LoadingComponent from "./Loading";
import Header from "./Header";

const Cart = () => {
  const { slug } = useParams();
  // console.log(slug);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      // console.log("fetch start");
      const productQuery = `*[_type == "product" && _id == '${slug}'][0]`;
      const req = await client.fetch(productQuery);
      // console.log(req, "fetched");
      if (req) {
        setData(req);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <Helmet>
        <title>Cart - Nassau Golf</title>
        <meta property="og:title" content="Cart - Nassau Golf" />
      </Helmet>
      <Header />
      <main className="products-_container">
        <DetailCard data={data} />
      </main>
      <Footer />
      <SocialIconsBar />
    </>
  );
};

export default Cart;

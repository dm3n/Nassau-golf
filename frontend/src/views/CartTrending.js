import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../views/cart.css";
import Footer from "./Footer/Footer";
import SocialIconsBar from "./social_icons_bar/SocialIconsBar";
import { useParams } from "react-router-dom";
import { client } from "../lib/client";
import LoadingComponent from "../views/Loading";
import Header from "./Header";
import DetailCard from "./detail_product/DetailCard";

function CartTrending() {
  const { slug } = useParams();
  // console.log(slug);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      const productQuery = `*[_type == "trending" && slug.current == '${slug}'][0]`;
      const req = await client.fetch(productQuery);
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
  console.log(data);
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
}

export default CartTrending;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import NavigationLinks from "../components/navigation-links";
import "./polos.css";
import ProductCard from "./productsCard/ProductCard";
import { client } from "../lib/client";
import Footer from "../views/Footer/Footer";
import SocialIconsBar from "../views/social_icons_bar/SocialIconsBar";
import LoadingComponent from "./Loading";
import Header from "./Header";

const Polos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchRef = await client.fetch(`*[_type == "catagories"]`);
      const fetchRes = await fetchRef.filter(
        (e) => e.category_name === "polos"
      );
      // console.log(fetchRes, "categories");
      const productsQuery = `*[_type == 'product']`;
      const req = await client.fetch(productsQuery);
      // console.log(req, "before filter");
      const res = await req.filter((e) => {
        if (e.category._ref === fetchRes[0]._id) {
          return e;
        }
      });
      // console.log(dataL, "after filter");
      if (res) {
        setData(res);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }
  return (
    <div className="polos-container">
      <Helmet>
        <title>Polos - Nassau Golf</title>
        <meta property="og:title" content="Polos - Nassau Golf" />
      </Helmet>
      <Header />
      <div className="products_container_polos">
        {data.map((e, i) => (
          <ProductCard data={e} key={i + "lsdjlshdusuhddkjqhdq"} />
        ))}
      </div>
      <Footer />
      <SocialIconsBar />
    </div>
  );
};

export default Polos;

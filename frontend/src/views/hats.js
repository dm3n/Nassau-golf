import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import NavigationLinks from "../components/navigation-links";
import GalleryCard12 from "../components/gallery-card12";
import "./hats.css";
import SocialIconBar from "../views/social_icons_bar/SocialIconsBar";
import Footer from "../views/Footer/Footer";
import { client } from "../lib/client";

const Hats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      const productsQuery = `*[_type == "product"]`;
      const req = await client.fetch(productsQuery);
      const res = await req.filter((e) => e.category === "hats");
      if (req) {
        setData(res);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (isLoading) {
    return <></>;
  }
  return (
    <div className="hats-container">
      <Helmet>
        <title>Hats - Nassau Golf</title>
        <meta property="og:title" content="Hats - Nassau Golf" />
      </Helmet>
      <header data-role="Accordion" className="hats-header">
        <Link to="/" className="hats-navlink">
          <img
            alt="logo"
            src="/playground_assets/nassau-golf-apparel-just--v2-black-200h.png"
            className="hats-image"
          />
        </Link>
        <div className="hats-separator"></div>
        <nav className="hats-nav">
          <NavigationLinks rootClassName="rootClassName12"></NavigationLinks>
        </nav>
        <div data-role="AccordionHeader" className="hats-accordion-header">
          <svg viewBox="0 0 1024 1024" className="hats-icon">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
        <div data-role="AccordionContent" className="hats-accordion-content">
          <div className="hats-nav1">
            <NavigationLinks rootClassName="rootClassName13"></NavigationLinks>
          </div>
        </div>
      </header>
      <div className="hats-gallery">
        {data.map((e) => (
          <GalleryCard12 data={e} rootClassName="rootClassName" />
        ))}
      </div>
      <Footer />
      <SocialIconBar />
    </div>
  );
};

export default Hats;

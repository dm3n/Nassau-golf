import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavigationLinks from "../components/navigation-links";

function Header() {
  const [showNav, setShowNav] = useState(false);

  return (
    <header data-role="Accordion" className="home-header">
      <Link to="/" className="home-navlink">
        <img
          alt="logo"
          src="/playground_assets/nassau-golf-apparel-just--v2-black-200h.png"
          className="home-image"
          style={{width: "194px", height: "118px"}}
        />
      </Link>
      <div className="home-separator"></div>
      <nav className="home-nav">
        <NavigationLinks rootClassName="rootClassName14" />
      </nav>
      <div
        data-role="AccordionHeader"
        className="home-accordion-header"
        style={{ cursor: "pointer" }}
        onClick={() => setShowNav((pre) => !pre)}
      >
        <svg viewBox="0 0 1024 1024" className="home-icon">
          <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
        </svg>
      </div>
      <div
        data-role="AccordionContent"
        className="home-accordion-content"
        style={{ maxHeight: `${showNav ? "none" : "0px"}` }}
      >
        <div className="home-nav1">
          <NavigationLinks rootClassName="rootClassName15" />
        </div>
      </div>
    </header>
  );
}

export default Header;

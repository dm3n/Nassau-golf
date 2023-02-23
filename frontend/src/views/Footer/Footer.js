import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../../lib/client";
import LoadingComponent from "../Loading";

function Footer() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchD = async () => {
      const req = await client.fetch(
        `*[_type == 'footer']| order(_createdAt asc)`
      );
      if (req) {
        setData([...req]);
        setIsLoading(false);
      }
    };
    fetchD();
  }, []);
  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }
  return (
    <footer
      className="home-footer"
      style={{ marginTop: "30px", backgroundColor: "#f1f1f1" }}
    >
      <div className="home-container08">
        <Link to="/" className="home-navlink13">
          <img
            alt="logo"
            src="/playground_assets/nassau-golf-apparel-just--v2-black-200h.png"
            className="home-image3"
          />
        </Link>
      </div>
      <div
        className="home-links-container"
        style={{ justifyContent: "flex-end" }}
      >
        <div
          className="footer_container"
          style={{
            display: "flex",
            gap: "50px",
            flexWrap: "wrap",
            textTransform: "capitalize",
          }}
        >
          {data &&
            data.map((e, i) => (
              <div
                className="footer_link_container"
                key={i + "778" + "//hdsjdsh"}
              >
                <h3
                  className="footer_heading_link"
                  style={{ marginBottom: "15px" }}
                >
                  {e.header}
                </h3>
                <div
                  className="items_links_container"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {e.list_of_items.map((e, i) => (
                    <Link
                      to={e.link ? e.link : ""}
                      key={i + "djsqldsjdsdlsdqldbcbvnwwwwwww"}
                    >
                      <p>{e.text}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

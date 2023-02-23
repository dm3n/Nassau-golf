import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { Helmet } from "react-helmet";
import SectionHeading from "../components/section-heading";
import CategoryCard from "../components/category-card";
import ItemCard from "../components/item-card";
import BlogPostCard from "../components/blog-post-card";
import "./home.css";

// importing the client to make sanity calls
import { client, urlFor } from "../lib/client.js";
import SocialIconsBar from "./social_icons_bar/SocialIconsBar";
import Footer from "./Footer/Footer";
import Header from "./Header";
import LoadingComponent from "./Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  // this set the loading state before getting the data from sanity
  const [trendData, setTrendData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchTrends = async () => {
        const trendsQuery = '*[_type == "trends"]';
        const req = await client.fetch(trendsQuery);
        const res = await req;
        // console.log(res);
        const data = {
          image: res[0].image,
          price: res[0].price,
          title: res[0].title,
        };
        if (res) {
          setTrendData(data);
        }
      };
      await fetchTrends();
      const fetchTrending = async () => {
        const trendingQuery = '*[_type == "trending"]';
        const req = await client.fetch(trendingQuery);
        if (req) {
          setTrendingData(req);
        }
      };
      await fetchTrending();
      const fetchCategories = async () => {
        const query = `*[_type == "catagories"]`;
        const req = await client.fetch(query);
        if (req) {
          setCategories(req);
          setIsLoading(false);
        }
      };
      await fetchCategories();
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <LoadingComponent />;
  }
  // console.log(categories);
  return (
    <>
      <Helmet>
        <title>Nassau Golf</title>
        <meta
          name="description"
          content="Nassau Golf home page with trending product and who we are"
        />
      </Helmet>
      <Header />
      <div className="home-container" style={{ position: "relative" }}>
        <div className="home-main">
          <div className="home-hero section-container">
            <div className="home-max-width max-width-container">
              <div className="home-hero1">
                <div className="home-container01">
                  <div className="home-container02">
                    <div className="home-info">
                      <img
                        alt="Rectangle43271305"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMicgaGVpZ2h0PSc1Micgdmlld0JveD0nMCAwIDIgNTInIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxyZWN0IHdpZHRoPScyJyBoZWlnaHQ9JzUyJyBmaWxsPSdibGFjaycgZmlsbC1vcGFjaXR5PScwLjUnLz4KPC9zdmc+Cg=="
                        className="home-image1"
                      />
                    </div>
                    <span className="home-text">
                      <span>nassau</span>
                      <br></br>
                      <span>trends - 2023</span>
                    </span>
                  </div>
                  <h1 className="home-text04">{trendData.title}</h1>
                  <div className="home-container03">
                    <span className="home-text05">FROM</span>
                    <span className="home-text06">{`$${trendData.price} CAD`}</span>
                  </div>
                  <div className="home-btn-group">
                    <Link
                      to="/category/:polos"
                      className="home-navlink01 button"
                    >
                      <span>
                        <span>Shop Now</span>
                        <br></br>
                      </span>
                    </Link>
                  </div>
                </div>
                <img
                  alt="image23271449"
                  src={urlFor(trendData.image)}
                  className="home-image2"
                />
              </div>
            </div>
          </div>
          <div className="home-categories section-container column">
            <div className="home-container04">
              <div className="home-max-width1 max-width-container">
                <div className="home-container05">
                  <SectionHeading
                    heading="SHOP BY CATEGORIES"
                    subtitle="Start shopping based on the categories you are interested in"
                  />
                  {categories.map((e, i) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                      }}
                      key={i + "èdfskkkqqsjjjjjj"}
                    >
                      <span className="home-text10">
                        <span>{e.category_name}</span>
                        <br></br>
                      </span>
                      <div className="home-cards-container">
                        <Link
                          to={`/category/:${e.category_name}`}
                          className="home-navlink02"
                        >
                          <CategoryCard
                            data={e}
                            rootClassName="category-card-root-class-name1"
                            className="home-component03"
                          />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="home-trending-items section-container">
            <div className="home-banner">
              <h1 className="home-text14">Nassau Golf</h1>
              <span className="home-text15">
                <span>
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    non volutpat turpis. Mauris luctus rutrum mi ut rhoncus.
                    Integer in dignissim tortor. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Sed non volutpat turpis. Mauris
                    luctus rutrum mi ut rhoncus. Integer in dignissim tortor.
                    Sed non volutpat turpis. Mauris luctus rutrum mi ut rhoncus.
                    Integer in dignissim ortor.
                  </span>
                </span>
              </span>
              <Link to="/about" className="home-navlink04 button">
                Read More
              </Link>
            </div>
            <div className="max-width-container home-max-width2">
              <div className="home-gallery">
                <div className="home-left">
                  <SectionHeading />
                  <ItemCard
                    data={trendingData[0]}
                    className="home-component06"
                  />
                </div>
                <div className="home-right">
                  <div className="home-top">
                    <div className="home-left1">
                      <ItemCard
                        data={trendingData[1]}
                        className="home-component07"
                      />
                    </div>
                    <div className="home-right1">
                      <ItemCard
                        data={trendingData[2]}
                        className="home-component08"
                      />
                    </div>
                  </div>
                  <div className="home-bottom">
                    <div className="home-left2">
                      <ItemCard
                        data={trendingData[3]}
                        className="home-component09"
                      />
                    </div>
                    <div className="home-right2">
                      <ItemCard
                        data={trendingData[4]}
                        className="home-component10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-container">
            <div className="max-width-container home-max-width3">
              <SectionHeading
                heading="About Us"
                subtitle="Learn about Nassau and our believes"
                rootClassName="section-heading-root-class-name"
              />
              <div className="home-container07">
                <Link to="/about" className="home-navlink10">
                  <BlogPostCard
                    title="Special combinations for nature lovers"
                    new_prop="HEADER 3"
                    image_src="https://images.unsplash.com/photo-1568229654980-91010242b5e6?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDE3fHxnb2xmfGVufDB8fHx8MTY2ODc0MzQwMw&amp;ixlib=rb-4.0.3&amp;w=1500"
                    description="DESC 3"
                    className="home-component12"
                  />
                </Link>
                <Link to="/about" className="home-navlink11">
                  <BlogPostCard
                    new_prop="HEADER 1"
                    image_src="https://images.unsplash.com/photo-1526166729864-ddc57657d48f?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDE4fHxnb2xmJTIwc2hpcnR8ZW58MHx8fHwxNjY4NzQzNDMz&amp;ixlib=rb-4.0.3&amp;w=1500"
                    description="DESC 1"
                    rootClassName="blog-post-card-root-class-name"
                    className="home-component13"
                  />
                </Link>
                <Link to="/about" className="home-navlink12">
                  <BlogPostCard
                    title="Unique natural color combinations"
                    new_prop="HEADER 2"
                    image_src="https://images.unsplash.com/photo-1593282153762-a41e3cceb06c?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fGdvbGZ8ZW58MHx8fHwxNjY4NzQzNDAz&amp;ixlib=rb-4.0.3&amp;w=1500"
                    description="DESC 2"
                    className="home-component14"
                  />
                </Link>
              </div>
            </div>
          </div>
          <Footer />
          <SocialIconsBar />
        </div>
      </div>
    </>
  );
};

export default Home;

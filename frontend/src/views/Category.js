import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import NavigationLinks from "../components/navigation-links";
import { client } from "../lib/client";
import Footer from "../views/Footer/Footer";
import SocialIconsBar from "../views/social_icons_bar/SocialIconsBar";
import { useParams } from "react-router-dom";
//
import "../views/polos.css";
import ProductCard from "./productsCard/ProductCard";
import Header from "./Header";
import LoadingComponent from "./Loading";
//

function Category() {
  const { category } = useParams();
  const categoryName = category.slice(1);
  // console.log(categoryName);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchRef = await client.fetch(`*[_type == "catagories"]`);
      const fetchRes = await fetchRef.filter(
        (e) => e.category_name === categoryName
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
    return <LoadingComponent />;
  }
  return (
    <div className="polos-container">
      <Helmet>
        <title>{category} - Nassau Golf</title>
        <meta property="og:title" content="Polos - Nassau Golf" />
      </Helmet>
      <Header />
      <div className="products_container_polos">
        {data.map((e, i) => (
          <ProductCard data={e} key={i * 87817} />
        ))}
      </div>
      <Footer />
      <SocialIconsBar />
    </div>
  );
}

export default Category;

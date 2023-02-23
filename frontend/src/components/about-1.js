import { urlFor } from "../lib/client";
import "./about-1.css";
import { PortableText } from "@portabletext/react";

const About1 = ({ data }) => {
  return (
    <div className={`about-1-blog-post-card `}>
      <img
        alt={"about-header"}
        src={urlFor(data.image[0])}
        className="about-1-image"
      />
      <div className="about-1-container">
        <span className="about-1-text">Nassau</span>
        <h1 className="about-1-text1">{data.subHeading}</h1>
        <div className="about-1-container1">
          <span className="about-1-text2">
            <PortableText value={data.content} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default About1;

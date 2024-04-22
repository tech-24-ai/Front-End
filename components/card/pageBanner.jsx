import React from "react";
import { Container } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import Image from "next/future/image";

function pageBanner({
  image,
  titleNode,
  backgroundImage = null,
  backgroundStyle = null,
}) {
  const bannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center center",
    backgroundSize: "cover", // Optional: Adjust based on your needs
    backgroundRepeat: "no-repeat", // Optional: Adjust based on your needs
  };
  return (
    <div
      className="page-banner"
      style={backgroundImage ? { ...bannerStyle, ...backgroundStyle } : {}}
    >
      <div
        className="banner-bg"
        style={
          backgroundImage
            ? {
                background: "linear-gradient(90deg, #141414 20%, transparent)",
              }
            : {}
        }
      >
        <Container>
          <div className="banner-container">
            <div className="banner-title-container">{titleNode}</div>
            {!backgroundImage && (
              <div className="banner-image-container">
                {image && (
                  <Image
                    className="banner-image"
                    loader={myImageLoader}
                    src={image}
                    alt=""
                    layout="raw"
                    width={508}
                    height={454}
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default pageBanner;

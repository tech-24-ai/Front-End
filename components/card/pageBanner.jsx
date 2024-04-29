import React from "react";
import { Container } from "reactstrap";
import Image from "next/future/image";
import { isMobile } from "react-device-detect";

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
                background: isMobile
                  ? "linear-gradient(0deg, #141414 35%, transparent)"
                  : "linear-gradient(90deg, #141414 20%, transparent)",
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
                    src={image}
                    alt=""
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

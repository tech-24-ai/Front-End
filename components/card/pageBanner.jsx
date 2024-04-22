import React from "react";
import { Container } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import Image from "next/future/image";

function pageBanner({ image, titleNode }) {
  return (
    <div className="page-banner">
      <div className="banner-bg">
        <Container>
          <div className="banner-container">
            <div className="banner-title-container">{titleNode}</div>
            <div className="banner-image-container">
              <Image
                className="banner-image"
                loader={myImageLoader}
                src={image}
                alt=""
                layout=""
                width={508}
                height={454}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default pageBanner;

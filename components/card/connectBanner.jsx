import React from "react";
import { Container } from "reactstrap";
import myImageLoader from "../../components/imageLoader";
import Image from "next/image";

function connectBanner({ image, titleNode }) {
    return (
        <div className="connect-banner">
            <div className="connect-banner-bg">
                <Container>
                    <div className="connect-banner-content">
                       <div className="title">
                        {titleNode}
                       </div>
                       <div className="img">
                        <Image
                            className="imageClass"
                            loader={myImageLoader}
                            src={image}
                            alt=""
                            layout="raw"
                            width={388}
                            height={84}
                        />
                       </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default connectBanner;
